import type { ResponseTrending, Trending } from "../../services/trending/type";
import { useEffect, useState } from "react";

import MoviesCard from "../../components/movies-card";
import { getTrending, getTrendingDetails } from "../../services/trending/api";
import { useQuery } from "../../hooks/useQuery";
import { useNavigate } from "react-router-dom";

const Trending = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const page = (query.get("page") !== null ? query.get("page") : 1) as string;
  const [loading, setLoading] = useState(false);
  const [trendingData, setTrendingData] = useState<ResponseTrending>();
  const [selectedMovie, setSelectedMovie] = useState<Trending>();

  useEffect(() => {
    fetchTrending();
  }, [page]);

  const fetchTrending = async () => {
    try {
      setLoading(true);
      const response = await getTrending();

      setTrendingData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoviesClick = async (id: number) => {
    try {
      const response = await getTrendingDetails(id.toString());
      setSelectedMovie(response);
      navigate(`/trending/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col py-5">
      <label className="text-xl px-10 font-bold">Trending</label>
      {!loading ? (
        <div className="flex flex-row px-5 py-5 gap-3 flex-wrap justify-center">
          {trendingData?.results.map((item: Trending) => (
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

export default Trending;
