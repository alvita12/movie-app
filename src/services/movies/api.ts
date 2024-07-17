import type { DetailMovie, ResponseMovies } from "./type";

import API from "../axiosWithConfig";

const getNowPlaying = async (page : string) => {
  try {
    const response = await API.get(`/movie/now_playing?language=en-US&page=${page}`);
    
    return response.data as ResponseMovies;
  } catch (error) {
    console.log(error);
  }
};

const getMovieById = async (id: string) => {
  try {
    const response = await API.get(`/movie/${id}?language=en-US`);
    return response.data as DetailMovie;
  } catch (error) {
    console.error(error);
  }
};

export { API, getNowPlaying, getMovieById }
