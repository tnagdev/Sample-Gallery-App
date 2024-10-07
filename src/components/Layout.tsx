import React, { ReactNode } from "react";
import Header from "./Header";
import SideBar from "./SideBar";




const Layout = ({ children }: { children: ReactNode }) => {

    return <div className="flex flex-row gap-3 flex-1 relative">
        <SideBar className="hidden sm:flex"/>
        <div className="flex-1 gap-3 flex flex-col">
            <Header />
            <div className="p-3 bg-indigo-200 dark:bg-slate-900 dark:text-white bg-opacity-20 rounded-md flex-1 overflow-hidden relative">
                <SideBar className="flex sm:hidden absolute z-[999] left-0 top-0 bottom-0 shadow-gray-900 shadow-2xl"/>
                {children}
            </div>
        </div>
    </div>

}

export default Layout;