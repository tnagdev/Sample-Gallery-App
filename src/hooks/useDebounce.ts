/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef } from "react";

export const useDebounce = (callback: CallableFunction, delay: number): CallableFunction => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    });

    let timer: NodeJS.Timeout;

    const naiveDebounce = (
        func: (...args: any[]) => void,
        delayMs: number,
        ...args: any[]
    ) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delayMs);
    };

    return useMemo(() => (...args: any) => naiveDebounce(
        callbackRef.current as any,
        delay,
        ...args,
    ), [delay]);
}