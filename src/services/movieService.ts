import axios, { AxiosResponse } from 'axios';
import { Movie } from '../types/movie';

const API_URL = 'https://api.themoviedb.org/3/search/movie';

interface FetchMoviesResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  const response: AxiosResponse<FetchMoviesResponse> = await axios.get(API_URL, {
    params: { query },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.results;
}
