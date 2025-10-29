import { useEffect, useRef, useState } from "react"

export function useTimer(autoStart: boolean = false, timeLimit: number | null = null, onTimeUp?: () => void) {
    const [timePassed, setTimePassed] = useState(0);
    const [isRunning, setIsRunning] = useState(autoStart);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const intervalIdRef = useRef<number | undefined>(undefined);
    const onTimeUpRef = useRef(onTimeUp);

    onTimeUpRef.current = onTimeUp;

    const start = () => { setIsRunning(true) };
    const pause = () => { setIsRunning(false) };
    const reset = () => {
        setTimePassed(0);
        setIsRunning(false);
        setIsTimeUp(false);
    }
    const restart = () => {
        setTimePassed(0);
        setIsRunning(true);
        setIsTimeUp(false);
    }

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setTimePassed((prevTime) => {
                    const newTime = prevTime + 1;
                    if (timeLimit && newTime >= timeLimit) {
                        setIsRunning(false);
                        setIsTimeUp(true);
                    }
                    return newTime;
                });
            }, 1000);
        } else {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = undefined;
            }
        }

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        };
    }, [isRunning, timeLimit]);

    useEffect(() => {
        if (isTimeUp) {
            onTimeUpRef.current?.();
        }
    }, [isTimeUp]);

    const timeRemaining = timeLimit ? Math.max(0, timeLimit - timePassed) : null;

    return {
        timePassed,
        timeRemaining,
        isRunning,
        isTimeUp,
        start,
        pause,
        reset,
        restart
    }
}