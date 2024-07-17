type ResponseMovies = {
    dates: Dates
    page: number
    results: Movies[];
    total_pages: number
    total_results: number
  };
  
  type Dates = {
    maximum: string
    minimum: string
  };
  
  type Movies = {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }

  interface DetailMovie extends Movies {
    belongs_to_collection: any;
    budget: number;
    genres: Genre[];
    homepage: string;
    imdb_id: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
  }
  
  type Genre = {
    id: number;
    name: string;
  };
  type ProductionCompany = {
    id: number;
    logo_path?: string;
    name: string;
    origin_country: string;
  };
  
  type ProductionCountry = {
    iso_3166_1: string;
    name: string;
  };
  
  type SpokenLanguage = {
    english_name: string;
    iso_639_1: string;
    name: string;
  };
  
  export type { ResponseMovies, Movies, DetailMovie, Dates };