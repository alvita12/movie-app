import type { Movies } from "../../services/movies/type";
import { useState } from "react";

import MoviesCard from "../../components/movies-card";
import { getMovieById } from "../../services/movies/api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { UseMovieList } from "./hooks/useMovieList";

const Movies = () => {
  const navigate = useNavigate();

  const { loading, nowPlayingData } = UseMovieList();

  const query = useQuery();
  const page = (query.get("page") !== null ? query.get("page") : 1) as string;

  const [selectedMovie, setSelectedMovie] = useState<Movies>();

  const handleNextPage = () => {
    const numPage = Number(page);
    navigate(`?page=${numPage + 1}`);
  };

  const handleBackPage = () => {
    const numPage = Number(page);
    if (numPage > 1) {
      navigate(`?page=${numPage - 1}`);
    }
  };

  const handleMoviesClick = async (id: number) => {
    try {
      const response = await getMovieById(id.toString());
      setSelectedMovie(response);
      navigate(`/movies/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col py-5">
      <label className="text-xl px-10 font-bold">Movies</label>
      {!loading ? (
        <div className="flex flex-row px-5 py-5 gap-3 flex-wrap justify-center">
          {nowPlayingData?.results.map((item: Movies) => (
            <MoviesCard
              poster_path={item.poster_path}
              title={item.title}
              release_date={item.release_date}
              size="w-40"
              onClick={() => handleMoviesClick(item.id)}
            />
          ))}
        </div>
      ) : (
        <div>Loading..</div>
      )}
      <div className="flex flex-row justify-center gap-3 p-8">
        <button
          onClick={handleBackPage}
          className="font-semibold"
          disabled={Number(page) <= 1}
        >
          Back
        </button>
        <button onClick={handleNextPage} className="font-semibold">
          Next
        </button>
      </div>

      {selectedMovie && (
        <div className="p-5 border rounded mt-5">
          <img
            src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
          />
          <p>{selectedMovie.release_date}</p>
          <p>{selectedMovie.vote_average}</p>
          <p>{selectedMovie.popularity}</p>
          <p>{selectedMovie.overview}</p>
        </div>
      )}
    </div>
  );
};

export default Movies;
