import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(`[ERROR] Can't read key "${key}" from local storage: `, error);
            return initialValue;
        }
    });

    const setValue = (value: T | ((prevValue: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(`[ERROR] Can't set localStorage key "${key}":`, error);
        }
    };

    const removeValue = () => {
        try {
            localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.log(`[ERROR] Can't remove localstorage key "${key}": `, error);
        }
    }

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.newValue) {
                try {
                    setStoredValue(JSON.parse(e.newValue));
                } catch (error) {
                    console.error('Error parsing storage event:', error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [key]);

    return [
        storedValue,
        setValue,
        removeValue
    ] as const;
}