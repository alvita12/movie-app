import { useEffect, useState } from "react";

import { ResponseMovies } from "../../../services/movies/type";
import { getNowPlaying } from "../../../services";
import { useQuery } from "../../../hooks/useQuery";

export const UseMovieList = () => {
  const query = useQuery();
  const page = (query.get("page") !== null ? query.get("page") : 1) as string;
  const [loading, setLoading] = useState(false);
  const [nowPlayingData, setNowPlayingData] = useState<ResponseMovies>();

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await getNowPlaying(page as string);

      setNowPlayingData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return { loading, nowPlayingData };
};
