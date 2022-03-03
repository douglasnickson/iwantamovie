import { IMovie } from '../model/IMovie';

export function parseMovies(results: IMovie[]): IMovie[] {
  return results.map((movie: IMovie) => ({
    id: movie.id,
    poster_path: movie.poster_path,
    original_title: movie.original_title,
    overview: movie.overview,
    title: movie.title,
    vote_average: movie.vote_average,
    genre_ids: [...movie.genre_ids],
  }));
}
