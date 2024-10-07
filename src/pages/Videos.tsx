/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { videoAtom } from "../atoms/searchAtom";
import { Videos } from "pexels";
import { getVideos } from "../services/pexel";
import InfiniteScroller from "../components/InfiniteScroller";
import Card from "../components/Card";


const VideosPage = () => {
    const [searchData, setSearchData] = useAtom(videoAtom);
    const [selected, setSelected] = useState(0);
    const query: string = new URLSearchParams(window.location.search).get('q') as string;

    useEffect(() => {
        if (query) fetchData(true);
        else setSearchData({...searchData, results: [], total: 0, page: 1})
    }, [])

    const fetchData = async (init = false) => {
        if (!query || ((searchData.page + 1) * searchData.count >= searchData.total) && !init) return;
        try {
            const data: Videos = await getVideos(query, init ? 1 : searchData.page + 1, searchData.count) as any
            setSearchData({
                ...searchData,
                page: init ? 1 : searchData.page + 1,
                results: init ? data.videos : searchData.results.concat(data.videos),
                total: data.total_results
            })
        } catch (err) {
            console.log('failed to load', err);
        }
    }

    return <>
        {searchData.results.length ? <div
            className='sticky top-0 gap-2 w-full bg-white dark:bg-slate-950 flex flex-col justify-center mb-2 p-2 rounded-md overflow-hidden'
        >
            <div className='w-full bg-cover bg-center absolute inset-0 z-0 blur-sm opacity-50' style={{ backgroundImage: `url("${searchData.results?.[selected]?.image}")` }}></div>
            <video preload='auto' className="h-[40vh] md:h-[30vw] z-10 rounded-md" src={searchData.results?.[selected]?.video_files[0].link} controls autoPlay />
        </div> : null}
        <InfiniteScroller
            className='h-full overflow-auto rounded-md'
            onScrollEnd={fetchData}
            threshold={70}
            debounceTime={200}
        >
            <div className='columns-[200px] gap-2'>
                {searchData?.results?.length ? searchData.results.map((item, i) => <Card selected={selected == i} className={`mb-2 rounded-md overflow-hidden`} onClick={() => setSelected(i)} key={item.id} imgUrl={item.image} />) : null}
            </div>
        </InfiniteScroller>
    </>
}

export default VideosPage;