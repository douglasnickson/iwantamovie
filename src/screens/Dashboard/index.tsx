import React, { useState } from 'react';

import { Container, Message, ComboBoxContainer, ComboBox } from './styles';

import Button from '@components/Button';
import Logo from '@components/Logo';
import Loading from '@components/Loading';

import { getRandomItems } from '@utils/Utils';

import {
  getTopRatedMovies,
  getPopularMovies,
  getTrendingWeekMovies,
  getMovieProvider,
} from '@services/tmdb';

import { IMovie } from 'src/model/IMovie';
import { IMovieProvider } from 'src/model/IMovieProvider';
import { Alert } from 'react-native';

type Props = {
  navigation: any;
};

export default function Dashboard({ navigation }: Props) {
  const [streaming, setStreaming] = useState('');
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<IMovie>();
  const [movieProvider, setMovieProvider] = useState<IMovieProvider[]>([]);

  const handleStreaming = (value: string) => {
    setStreaming(value);
  };

  const handleMovie = async () => {
    if (!streaming) {
      Alert.alert('Ocorreu um erro', 'Selecione uma opção de streaming!');
      return;
    }

    setLoading(true);
    let page = 1;
    const movies = [];
    while (page <= 20) {
      const topRatedMovies = await getTopRatedMovies(page);
      const popularMovies = await getPopularMovies(page);
      const trendingWeekMovies = await getTrendingWeekMovies(page);
      movies.push(...topRatedMovies, ...popularMovies, ...trendingWeekMovies);
      page++;
    }
    const uniqueMovies = [
      ...new Map(movies.map((item) => [item.id, item])).values(),
    ];

    let count = 0;
    while (count < uniqueMovies.length) {
      const randomMovie = getRandomItems(uniqueMovies, 1);
      const providersFound = await getMovieProvider(randomMovie[0].id);
      if (providersFound.length > 0) {
        const movieProviders = providersFound.filter(
          (provider) => provider.provider_name === streaming
        );
        if (movieProviders.length > 0) {
          setMovie(randomMovie[0]);
          setMovieProvider(providersFound);
          break;
        }
        count++;
      }
    }

    if (!movie) {
      Alert.alert('Ocorreu um erro', 'Nenhum filme encontrado!');
      setLoading(false);
      return;
    }

    setLoading(false);
    console.log(movie);
    console.log(movieProvider);
    navigation.navigate('MovieDetail', { movie, movieProvider });
  };

  return (
    <Container>
      <Logo />
      <Message>
        Selecione um serviço de streaming e clique em pesquisar para obter uma
        recomendação.
      </Message>
      <ComboBoxContainer>
        <ComboBox
          selectedValue={streaming}
          mode="dropdown"
          onValueChange={(itemValue: any) => handleStreaming(itemValue)}>
          <ComboBox.Item label="Selecione uma opção" value="" />
          <ComboBox.Item label="Netflix" value="Netflix" />
          <ComboBox.Item label="Prime Vídeo" value="Amazon Prime Video" />
          <ComboBox.Item label="Disney +" value="Disney Plus" />
          <ComboBox.Item label="Star +" value="Star Plus" />
          <ComboBox.Item label="Paramount +" value="Paramount Plus" />
          <ComboBox.Item label="Apple Tv" value="Apple TV Plus" />
          <ComboBox.Item label="HBO Max" value="HBO Max" />
          <ComboBox.Item label="Telecine Play" value="Telecine Play" />
          <ComboBox.Item label="Globo Play" value="Globo Play" />
        </ComboBox>
      </ComboBoxContainer>
      <Button disabled={loading} onPress={handleMovie}>
        PESQUISAR
      </Button>
      {loading && <Loading title={'Buscando...'} />}
    </Container>
  );
}
