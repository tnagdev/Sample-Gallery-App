/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { photoAtom } from "../atoms/searchAtom";
import { PhotosWithTotalResults } from "pexels";
import { getPhotos } from "../services/pexel";
import InfiniteScroller from "../components/InfiniteScroller";
import Card from "../components/Card";



const PhotosPage = () => {
    const [searchData, setSearchData] = useAtom(photoAtom);
    const [selected, setSelected] = useState(0);
    const query: string = new URLSearchParams(window.location.search).get('q') as string;

    useEffect(() => {
        if (query) fetchData(true);
        else setSearchData({ ...searchData, results: [], total: 0, page: 1 })
    }, [])

    const fetchData = async (init = false) => {
        if (!query || ((searchData.page + 1) * searchData.count >= searchData.total) && !init) return;
        try {
            const data: PhotosWithTotalResults = await getPhotos(query, init ? 1 : searchData.page + 1, searchData.count) as any
            setSearchData({
                ...searchData, page: init ? 1 : searchData.page + 1,
                results: init ? data.photos : searchData.results.concat(data.photos),
                total: data.total_results
            })
        } catch (err) {
            console.log('failed to load', err);
        }
    }

    return <>
        {searchData.results.length ? <div className='sticky top-0 gap-2 w-full flex justify-center mb-2 p-2 rounded-md overflow-hidden'>
            <div className='w-full bg-cover bg-center absolute inset-0 z-0 blur-sm opacity-50' style={{ backgroundImage: `url("${searchData.results?.[selected]?.src.small}")` }}></div>
            <img
                className="h-[20vw] z-10 rounded-md"
                src={searchData.results?.[selected]?.src.original}
            />
            <div className="flex-1 z-10 rounded-md flex flex-col p-4 justify-between" style={{ backgroundColor: searchData.results?.[selected]?.avg_color + 'bb' }}>
                <p className="text-lg">{searchData.results?.[selected]?.alt}</p>
                <p className="text-sm text-right">By {searchData.results?.[selected]?.photographer}</p>
            </div>
        </div> : null}
        <InfiniteScroller
            className='h-full overflow-auto rounded-md'
            onScrollEnd={fetchData}
            threshold={70}
            debounceTime={200}
        >
            <div className='columns-[200px] gap-2'>
                {searchData?.results?.length ? searchData.results.map((item, i) => <Card selected={selected == i} onClick={() => setSelected(i)} className={`mb-2 rounded-md overflow-hidden`} key={item.id} imgUrl={item.src.medium} />) : null}
            </div>
        </InfiniteScroller>
    </>
}

export default PhotosPage;