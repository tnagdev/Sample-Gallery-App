/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, ComponentProps, useCallback } from "react";
import { useDebounce } from "../hooks/useDebounce";



const InfiniteScroller = ({
    children, 
    debounceTime = 500, 
    onScrollEnd,
    threshold = 90, 
    ...props
}: ComponentProps<'div'> & {debounceTime?: number, onScrollEnd: CallableFunction, threshold: number}) => {
    const scrollHandler = useCallback(useDebounce((event: ChangeEvent<HTMLDivElement>) => {
        const scrollPercentage = Math.floor(event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) * 100);
        if (scrollPercentage >= threshold) {
            onScrollEnd?.()
        }
    }, debounceTime), [])

    return <div {...props} onScroll={scrollHandler as any}>
        {children}
    </div>
}

export default InfiniteScroller;