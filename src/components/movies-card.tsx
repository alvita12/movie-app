interface Props {
  title: string;
  poster_path: string;
  release_date: string;
  size: string;
  onClick: () => void;
}

const MoviesCard = (props: Props) => {
  const { title, poster_path, release_date, size, onClick } = props;
  return (
    <div className={`flex flex-col ${size} cursor-pointer`} onClick={onClick}>
      <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} />
      <label className="font-bold">{title}</label>
      <p className="text-sm">{release_date}</p>
    </div>
  );
};

export default MoviesCard;
