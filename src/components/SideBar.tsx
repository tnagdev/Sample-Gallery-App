import React, { ComponentProps } from "react";
import Logo from './../assets/Pika-Labs-icon-1.svg';
import { twMerge } from "tailwind-merge";
import { useAtom } from "jotai";
import { sideBarAtom } from "../atoms/sidebarAtom";
import { routes } from "../App";
import { useNavigate } from "react-router-dom";



const SideBar = ({className, ...props}: ComponentProps<'div'>) => {
    const [sidebarState] = useAtom(sideBarAtom);
    const navigate = useNavigate();

    return <div {...props} className={twMerge([`flex flex-col top-0 bottom-0 left-0 overflow-hidden transition-all bg-indigo-200 dark:bg-slate-900 dark:text-white sm:bg-opacity-20 shadow-2xl sm:rounded-md rounded-none ${sidebarState.isOpen ? 'min-w-[300px] w-auto p-2' : 'min-w-0 w-0 p-0'}`], className)}>
        <div className="items-center flex flex-row gap-5">
            <img src={Logo} className="h-[48px] dark:invert"/>
            <div className="font-bold text-2xl">PicsLab</div>
        </div>
        <div className="bg-white my-2 w-full h-[1px]" />
        {routes.map(menu => <div 
            key={menu.key} onClick={() => navigate(menu.path + window.location.search)} 
            className={`flex items-center gap-2 p-3 my-2 rounded-md transition-all ${window.location.pathname.startsWith(menu.path) ? 'bg-indigo-700 dark:bg-white dark:text-black shadow-lg bg-opacity-60 text-white' : 'bg-indigo-200 bg-opacity-30 dark:bg-opacity-5'}`}
        >
            {menu.logo}{menu.label}
        </div>)}
    </div>
}

export default SideBar;