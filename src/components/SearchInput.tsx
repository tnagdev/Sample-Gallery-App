/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEventHandler, ComponentProps, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useDebounce } from "../hooks/useDebounce";
import { Loader2, SearchIcon } from "lucide-react";


export type SearchInputProps = ComponentProps<'input'> & {
    debounceTime?: number,
    onSearch?: (event: any) => void,
    searchData?: any[],
    showIcon?: boolean,
    iconPosition?: 'left' | 'right'
}

const SearchInput = ({
    onSearch,
    showIcon = true, 
    debounceTime = 200,
    className, 
    iconPosition = 'left',
    ...props
}: SearchInputProps) => {
    const [loading, setLoading] = useState(false);

    const fetchData = async (value: string) => {
        try {
            if (!onSearch) return;
            setLoading(true);
            await onSearch(value);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const searchHandler = useCallback(useDebounce((event: React.ChangeEvent<HTMLInputElement>) => {
        fetchData?.(event.target.value);
    }, debounceTime), [])

    return <div className={twMerge(['transition-all p-2 bg-white dark:bg-slate-800 border-slate-900 flex items-center gap-2 rounded-md'], className)}>
        {showIcon && iconPosition == 'left' ? <SearchIcon /> : null}
        <input {...props} onChange={searchHandler as ChangeEventHandler} className='bg-transparent border-0 shadow-none outline-none w-full' {...props}></input>
        {loading ? <Loader2 className="animate-spin text-neutral-400" size={20}/> : showIcon && iconPosition == 'right' ? <SearchIcon /> : null}
    </div>
}

export default SearchInput;