import { useEffect, useRef, useState } from "react"

export function useTimer() {
    const [timePassed, setTimePassed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalIdRef = useRef<number | null>(null);

    const start = () => { setIsRunning(true) };
    const pause = () => { setIsRunning(false) };
    const reset = () => {
        setTimePassed(0);
        setIsRunning(false);
    }
    const restart = () => {
        setTimePassed(0);
        setIsRunning(true);
    }

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setTimePassed((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        }

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        };
    }, [isRunning]);

    return {
        timePassed, 
        isRunning,
        start,
        pause,
        reset,
        restart
    }
}