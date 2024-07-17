import { useEffect, useState } from "react";

import { DetailMovie } from "../../services/movies/type";
import { getMovieById } from "../../services/movies/api";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<DetailMovie>();

  useEffect(() => {
    fetchMovieById();
  }, [id]);

  const fetchMovieById = async () => {
    try {
      setLoading(true);

      const response = await getMovieById(id as string);

      setMovies(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? <div>{movies?.title}</div> : <div>Loading...</div>;
};

export default Detail;
