import type { ResponseTrending, Trending } from "./type";

import API from "../axiosWithConfig";

const getTrending = async () => {
try {
    const response = await API.get("/trending/movie/day?language=en-US");
    
    return response.data as ResponseTrending;
  } catch (error) {
    console.log(error);
  }
};

const getTrendingDetails = async (id: string) => {
  try {
    const response = await API.get(`/movie/${id}?language=en-US`);
    return response.data as Trending;
  } catch (error) {
    console.error(error);
  }
};
    
    export { API, getTrending, getTrendingDetails };