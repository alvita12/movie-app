import type { ResponseTVShows, TVShows } from "./type";

import { API } from "../movies";

const getTVShows = async (page : string) => {
    try {
        const response = await API.get(`/tv/popular?language=en-US&page=${page}`);
        
        return response.data as ResponseTVShows;
      } catch (error) {
        console.log(error);
      }
    };

    const getTVShowsDetails = async (id: string) => {
        try {
          const response = await API.get(`/movie/${id}?language=en-US`);
          return response.data as TVShows;
        } catch (error) {
          console.error(error);
        }
      };
    
    export { API, getTVShows, getTVShowsDetails };