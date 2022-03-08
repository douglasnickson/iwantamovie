import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { parse, format } from 'date-fns';

import { BannerAd, TestIds, BannerAdSize } from '@react-native-admob/admob';

import {
  Container,
  TextBold,
  MovieImage,
  MovieDescription,
  MovieTitle,
  MovieReleaseDate,
  MovieOriginalTitle,
  MovieStreamingContainer,
  MovieStreaming,
  MovieCastContainer,
  MoviePersonContainer,
  MovieCast,
  MovieCastName,
  MovieCastCharacter,
  MovieGenres,
  MovieRating,
} from './styles';

import { IMovie } from 'src/model/IMovie';
import { IMovieProvider } from 'src/model/IMovieProvider';
import { IGenre } from 'src/model/IGenre';
import { ICast } from 'src/model/ICast';

import { getGenres, getCast } from '@services/tmdb';

import imageNotFound from '@assets/not-found.png';

type Props = {
  route: any;
};

type IMovieWithProvider = {
  movie: IMovie;
  movieProvider: IMovieProvider[];
};

const MovieDetail = ({ route }: Props) => {
  const { movie, movieProvider }: IMovieWithProvider = route.params;
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [cast, setCast] = useState<ICast[]>([]);

  useEffect(() => {
    const handleGenres = async () => {
      const genresFound = await getGenres();
      const genresFiltered = genresFound.filter((genre) =>
        movie.genre_ids.includes(genre.id)
      );
      setGenres(genresFiltered);
    };

    const handleCast = async () => {
      const castFound = await getCast(movie.id);
      setCast(castFound);
    };

    handleGenres();
    handleCast();
  }, [movie]);

  const adUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-1209664770627704/1842728382';

  return (
    <>
      <ScrollView>
        <Container>
          <MovieImage
            source={{
              uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
            }}
          />
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieOriginalTitle>
            <TextBold>Título Original: </TextBold>
            {movie.original_title}
          </MovieOriginalTitle>
          <MovieReleaseDate>
            <TextBold>Lançamento: </TextBold>
            {format(
              parse(movie.release_date, 'yyyy-MM-dd', new Date()),
              'dd/MM/yyyy'
            )}
          </MovieReleaseDate>
          <MovieGenres>
            <TextBold>Gênero: </TextBold>
            {genres &&
              genres.map((genre, index) => (
                <MovieGenres key={genre.id}>
                  {(index ? ', ' : '') + genre.name}
                </MovieGenres>
              ))}
          </MovieGenres>
          <MovieDescription>{movie.overview}</MovieDescription>
          <MovieCastContainer>
            <ScrollView horizontal={true}>
              {cast &&
                cast.map((castMember, index) => (
                  <>
                    <MoviePersonContainer
                      key={castMember.name + '-' + castMember.id + '-' + index}>
                      {castMember.profile_path ? (
                        <MovieCast
                          source={{
                            uri: `https://image.tmdb.org/t/p/w300${castMember.profile_path}`,
                          }}
                        />
                      ) : (
                        <MovieCast source={imageNotFound} />
                      )}

                      <MovieCastName>{castMember.name}</MovieCastName>
                      <MovieCastCharacter>
                        {castMember.character}
                      </MovieCastCharacter>
                    </MoviePersonContainer>
                  </>
                ))}
            </ScrollView>
          </MovieCastContainer>
          <MovieRating>{`Score: ${movie.vote_average}/10`}</MovieRating>
          <MovieStreamingContainer>
            {movieProvider &&
              movieProvider.map((provider, index) => (
                <>
                  <MovieStreaming
                    key={
                      provider.provider_name +
                      '-' +
                      provider.provider_id +
                      '-' +
                      index
                    }
                    source={{
                      uri: `https://image.tmdb.org/t/p/w300${provider.logo_path}`,
                    }}
                  />
                </>
              ))}
          </MovieStreamingContainer>
        </Container>
      </ScrollView>
      <BannerAd
        size={BannerAdSize.BANNER}
        unitId={adUnitId}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error) => console.error(error)}
      />
    </>
  );
};

export default MovieDetail;
