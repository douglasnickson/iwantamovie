import { ScrollView } from 'react-native';
import React from 'react';

import {
  Container,
  MovieImage,
  MovieDescription,
  MovieTitle,
  MovieStreaming,
  MovieCast,
  MovieGenres,
  MovieRating,
} from './styles';

type Props = {
  route: any;
};

const MovieDetail = ({ route }: Props) => {
  const { streaming } = route.params;
  return (
    <ScrollView>
      <Container>
        <MovieImage
          source={{
            uri: 'https://static.displate.com/857x1200/displate/2018-01-22/237b645626f368ac5dd2a4b94f1e812e_4365260d579bf564fa7eca9507b0c5e4.jpg',
          }}
        />
        <MovieTitle>{streaming}</MovieTitle>
        <MovieGenres>Gênero: Comédia, Ação, Aventura</MovieGenres>
        <MovieDescription>
          The Madrigals are an extraordinary family who live hidden in the
          mountains of Colombia in a charmed place called the Encanto. The magic
          of the Encanto has blessed every child in the family with a unique
          gift -- every child except Mirabel. However, she soon may be the
          Madrigals last hope
        </MovieDescription>
        <MovieCast>
          Elenco: Douglas Nickson, Elen Vitória, João da Silva, Maria Amanda
        </MovieCast>
        <MovieRating>IMDB: 4.5/5</MovieRating>
        <MovieStreaming />
      </Container>
    </ScrollView>
  );
};

export default MovieDetail;
