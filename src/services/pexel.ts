import { createClient } from 'pexels';


export const pexelClient = createClient(import.meta.env.VITE_REACT_APP_PEXEL_API_KEY as string);

export const getPhotos = async (query = '', page = 0, count = 50) => {
    try {
        const data = await pexelClient.photos.search({
            query,
            page,
            per_page: count
        });
        return data;
    } catch(err) {
        console.log(err);
        return [];
    }
}

export const getVideos = async (query = '', page = 0, count = 50) => {
    try {
        const data = await pexelClient.videos.search({
            query,
            page,
            per_page: count
        });
        return data;
    } catch(err) {
        console.log(err);
        return [];
    }
}

export const getCollections = async (type: 'all' | 'featured', page = 0, count = 50) => {
    try {
        const data = await pexelClient.collections[type]({
            page,
            per_page: count
        });
        return data;
    } catch(err) {
        console.log(err);
        return [];
    }
}