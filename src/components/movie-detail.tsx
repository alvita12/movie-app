import { useEffect, useState } from "react";

import type { Movies } from "../services/movies/type";
import { getMovieById } from "../services/movies/api";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movies, setMovies] = useState<Movies>();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await getMovieById(id as string);
        setMovies(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row gap-8 p-52 bg-slate-200 rounded-full shadow-lg">
      <img
        src={`https://image.tmdb.org/t/p/w342/${movies.poster_path}`}
        alt={movies.title}
        className="w-60 h-auto"
      />
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold">{movies.title}</h1>
        <p>
          <strong>Release Date:</strong> {movies.release_date}
        </p>
        <p>
          <strong>Rating:</strong> {movies.vote_average}
        </p>
        <p>
          <strong>Popularity:</strong> {movies.popularity}
        </p>
        <p>
          <strong>Overview:</strong> {movies.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieDetail;
