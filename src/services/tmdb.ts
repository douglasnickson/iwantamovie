import { TMDB_API_KEY } from '@env';
import { IMovie } from 'src/model/IMovie';

import api from './api';
import { parseMovies } from '../utils/Utils';
import { IMovieProvider } from 'src/model/IMovieProvider';
import { IGenre } from 'src/model/IGenre';
import { ICast } from 'src/model/ICast';

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

export const getMovieProvider = async (
  movieId: number
): Promise<IMovieProvider[]> => {
  const response = await api.get(
    `${baseUrl}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}&language=pt-BR&region=BR`
  );

  const { results } = response.data;
  const { BR } = results;

  if (!BR || !BR.flatrate) {
    return [];
  }

  return BR.flatrate.map((provider: IMovieProvider) => ({
    provider_id: provider.provider_id,
    provider_name: provider.provider_name,
    logo_path: provider.logo_path,
  }));
};

export const getGenres = async (): Promise<IGenre[]> => {
  const response = await api.get(
    `${baseUrl}/genre/movie/list?api_key=${TMDB_API_KEY}&language=pt-BR&region=BR`
  );

  const { genres } = response.data;
  return genres.map((genre: IGenre) => ({
    id: genre.id,
    name: genre.name,
  }));
};

export const getCast = async (movieId: number): Promise<ICast[]> => {
  const response = await api.get(
    `${baseUrl}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=pt-BR&region=BR`
  );

  const { cast } = response.data;

  return cast.map((castMember: ICast) => ({
    adult: castMember.adult,
    gender: castMember.gender,
    id: castMember.id,
    known_for_department: castMember.known_for_department,
    name: castMember.name,
    original_name: castMember.original_name,
    popularity: castMember.popularity,
    profile_path: castMember.profile_path,
    cast_id: castMember.cast_id,
    character: castMember.character,
    order: castMember.order,
  }));
};
