import { TMDB_API_KEY } from '@env';
import { IMovie } from 'src/model/IMovie';

import api from './api';
import { parseMovies } from '../utils/Utils';

const baseUrl = 'https://api.themoviedb.org/3';

const getMovies = async (endpoint: string, page: number): Promise<any> => {
  const response = await api.get(
    `${baseUrl}${endpoint}?api_key=${TMDB_API_KEY}&language=pt-BR&region=BR&page=${page}`
  );

  return response;
};

export const getTopRatedMovies = async (page: number): Promise<IMovie[]> => {
  const response = await getMovies('/movie/top_rated', page);
  const { results } = response.data;
  return parseMovies(results);
};

export const getPopularMovies = async (page: number): Promise<IMovie[]> => {
  const response = await getMovies('/movie/popular', page);
  const { results } = response.data;
  return parseMovies(results);
};

export const getTrendingWeekMovies = async (
  page: number
): Promise<IMovie[]> => {
  const response = await getMovies('/trending/movie/week', page);
  const { results } = response.data;
  return parseMovies(results);
};

export default { getTopRatedMovies };
