import React, { ReactNode } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useAtom } from "jotai";
import { sideBarAtom } from "../atoms/sidebarAtom";




const Layout = ({ children }: { children: ReactNode }) => {
    const [sidebarState] = useAtom(sideBarAtom);

    return <div className={`flex ${sidebarState.isOpen ? 'gap-3' : 'gap-0'} flex-row flex-1 relative`}>
        <SideBar className="hidden sm:flex"/>
        <div className={`flex-1 flex flex-col gap-3`}>
            <Header />
            <div className="p-3 bg-indigo-200 dark:bg-slate-900 dark:text-white bg-opacity-20 rounded-md flex-1 overflow-hidden relative">
                <SideBar className="flex sm:hidden absolute z-[999] left-0 top-0 bottom-0 shadow-gray-900 shadow-2xl"/>
                {children}
            </div>
        </div>
    </div>

}

export default Layout;