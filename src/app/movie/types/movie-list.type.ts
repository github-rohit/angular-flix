import { Comment } from '../../comments/types/comment.type';

export interface MovieListRes {
  movies: Movie[];
  page: number;
  filters: Filters;
  entries_per_page: number;
  total_results: number;
}

interface Filters {}

export interface Movie {
  _id: string;
  fullplot: string;
  imdb: Imdb;
  year: number;
  plot: string;
  genres: string[];
  rated: string;
  metacritic?: number;
  title: string;
  lastupdated: string;
  languages: string[];
  writers: string[];
  type: string;
  tomatoes: Tomatoes;
  poster: string;
  num_mflix_comments: number;
  released: string;
  awards: Awards;
  countries: string[];
  cast: string[];
  directors: string[];
  runtime: number;
}

interface Awards {
  wins: number;
  nominations: number;
  text: string;
}

interface Tomatoes {
  website?: string;
  viewer: Viewer;
  dvd: string;
  critic: Viewer;
  boxOffice?: string;
  consensus?: string;
  rotten: number;
  production: string;
  lastUpdated: string;
  fresh: number;
}

interface Viewer {
  rating: number;
  numReviews: number;
  meter: number;
}

interface Imdb {
  rating: number;
  votes: number;
  id: number;
}

export interface MovieDetailsWithComment extends Movie {
  comments: Comment[];
}
