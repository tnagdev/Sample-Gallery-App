/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import SearchInput from "./SearchInput";
import { getPhotos, getVideos } from "../services/pexel";
import { useAtom } from "jotai";
import { photoAtom, videoAtom } from "../atoms/searchAtom";
import {PhotosWithTotalResults, Videos} from 'pexels/dist/types'
import { themeAtom } from "../atoms/themeAtom";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import { sideBarAtom } from "../atoms/sidebarAtom";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const [ logo ] = useState('https://yt3.ggpht.com/yti/ANjgQV8gu1gDTy9-aOFOTeyncrVajl-jXrUPkAeYqKPzRgVcC1Y=s88-c-k-c0x00ffffff-no-rj');
    const [photosState, setPhotosState] = useAtom(photoAtom);
    const [videosState, setVidoesState] = useAtom(videoAtom);
    const [sidebarState, setSidebarState] = useAtom(sideBarAtom);
    const [theme, setTheme] = useAtom(themeAtom);
    const query: string = new URLSearchParams(window.location.search).get('q') as string;
    const navigate = useNavigate();

    const toggleTheme = () => {
        setTheme(theme == 'light' ? 'dark' : 'light');
    }

    useEffect(() => {
        if (theme == 'dark') {
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light')
            localStorage.setItem('theme', 'light');
        }
    }, [theme])

    const toggleMenu = () => {
        setSidebarState({...sidebarState, isOpen: !sidebarState.isOpen})
    }

    const fetchData = async (value: string) => {
        try {
            navigate(window.location.pathname + value ? ('?q=' + value) : '');
            const [state, setState, loadData, responseField] = window.location.pathname == '/photos' ? 
                                        [photosState, setPhotosState, getPhotos, 'photos'] : 
                                        [videosState, setVidoesState, getVideos, 'videos'];
            if (!value) {
                setState({...state, page: 1, total: 0, results: []});
                return;
            }
            const data: PhotosWithTotalResults & Videos = await loadData(value, 1, state.count) as any;
            setState({...state, page: 1, total: data.total_results, results: data[responseField as ('photos' | 'videos')]});
        } catch (err) {
            console.log('failed to load', err);
        }
    }

    return <div className={`flex flex-row items-center p-2 bg-indigo-300 dark:bg-slate-900 dark:text-white bg-opacity-20 shadow-2xl justify-between rounded-md`}>
        <MenuIcon className={`transition-all ${sidebarState.isOpen ? 'rotate-90' : 'rotate-0'}`} onClick={toggleMenu}/>
        <SearchInput 
            className="w-[60%] mx-2"
            onSearch={fetchData}
            debounceTime={300}
            defaultValue={query}
        />
        <div className="flex items-center gap-5">
            {theme == 'dark' ? <SunIcon onClick={toggleTheme}/> : <MoonIcon onClick={toggleTheme}/>}
            <Avatar variant='rounded' src={logo}/>
        </div>
    </div>
}


export default Header;