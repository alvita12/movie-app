import type { ResponseTVShows, TVShows } from "../../services/tv-shows/type";
import { useEffect, useState } from "react";

import MoviesCard from "../../components/movies-card";
import { getTVShows, getTVShowsDetails } from "../../services/tv-shows/api";
import { useQuery } from "../../hooks/useQuery";
import { useNavigate } from "react-router-dom";

const TVShows = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const page = (query.get("page") !== null ? query.get("page") : 1) as string;
  const [loading, setLoading] = useState(false);
  const [tvShowsData, setTVShowsData] = useState<ResponseTVShows>();
  const [selectedMovie, setSelectedMovie] = useState<TVShows>();

  useEffect(() => {
    fetchTrending();
  }, [page]);

  const fetchTrending = async () => {
    try {
      setLoading(true);
      const response = await getTVShows(page as string);

      setTVShowsData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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
      const response = await getTVShowsDetails(id.toString());
      setSelectedMovie(response);
      navigate(`/tv-shows/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col py-5">
      <label className="text-xl px-10 font-bold">TV Shows</label>
      {!loading ? (
        <div className="flex flex-row px-5 py-5 gap-3 flex-wrap justify-center">
          {tvShowsData?.results.map((item: TVShows) => (
            <MoviesCard
              poster_path={item.poster_path}
              title={item.name}
              release_date={item.first_air_date}
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
            alt={selectedMovie.name}
          />
          <p>{selectedMovie.first_air_date}</p>
          <p>{selectedMovie.vote_average}</p>
          <p>{selectedMovie.popularity}</p>
          <p>{selectedMovie.overview}</p>
        </div>
      )}
    </div>
  );
};

export default TVShows;
