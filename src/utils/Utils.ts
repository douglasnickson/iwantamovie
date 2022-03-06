import { IMovie } from '../model/IMovie';

export function parseMovies(results: IMovie[]): IMovie[] {
  return results.map((movie: IMovie) => ({
    id: movie.id,
    poster_path: movie.poster_path,
    original_title: movie.original_title,
    overview: movie.overview,
    release_date: movie.release_date,
    title: movie.title,
    vote_average: movie.vote_average,
    genre_ids: [...movie.genre_ids],
  }));
}

export function getRandomItems(arr: IMovie[], n: number): IMovie[] {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len) {
    throw new RangeError('getRandom: more elements taken than available');
  }
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
