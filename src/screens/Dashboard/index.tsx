import React, { useState, useEffect } from 'react';
import {
  BannerAd,
  TestIds,
  BannerAdSize,
  useInterstitialAd,
} from '@react-native-admob/admob';

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

import { IMovieProvider } from 'src/model/IMovieProvider';
import { Alert } from 'react-native';
import { IMovie } from 'src/model/IMovie';

type Props = {
  navigation: any;
};

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1209664770627704/8919504132';

const adIntersticialUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-1209664770627704/3197894852';

let movie: IMovie;
let movieProvider: IMovieProvider[] = [];

export default function Dashboard({ navigation }: Props) {
  const [streaming, setStreaming] = useState('');
  const [loading, setLoading] = useState(false);

  const { adLoaded, adDismissed, show } = useInterstitialAd(
    adIntersticialUnitId,
    {
      requestOptions: {
        requestNonPersonalizedAdsOnly: true,
      },
    }
  );

  const handleStreaming = (value: string) => {
    setStreaming(value);
  };

  const handleMovie = async () => {
    if (!streaming) {
      Alert.alert('Ocorreu um erro', 'Selecione uma opção de streaming!');
      return;
    }

    try {
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
            console.log(randomMovie[0]);

            movie = randomMovie[0];
            movieProvider.push(...providersFound);
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
      setStreaming('');

      if (adLoaded) {
        show();
      } else {
        navigation.navigate('MovieDetail', { movie, movieProvider });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (adDismissed) {
      navigation.navigate('MovieDetail', { movie, movieProvider });
    }
  }, [adDismissed, navigation]);

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
          <ComboBox.Item label="Apple Tv" value="Apple TV Plus" />
          <ComboBox.Item label="Claro video" value="Claro video" />
          <ComboBox.Item label="Disney +" value="Disney Plus" />
          <ComboBox.Item label="Globo Play" value="Globo Play" />
          <ComboBox.Item label="HBO Max" value="HBO Max" />
          <ComboBox.Item label="Netflix" value="Netflix" />
          <ComboBox.Item label="Oi Play" value="Oi Play" />
          <ComboBox.Item label="Prime Vídeo" value="Amazon Prime Video" />
          <ComboBox.Item label="Paramount +" value="Paramount Plus" />
          <ComboBox.Item label="Star +" value="Star Plus" />
          <ComboBox.Item label="Telecine Play" value="Telecine Play" />
        </ComboBox>
      </ComboBoxContainer>
      <Button disabled={loading} onPress={handleMovie}>
        PESQUISAR
      </Button>
      {loading && <Loading title={'Buscando...'} />}
      <BannerAd
        size={BannerAdSize.BANNER}
        unitId={adUnitId}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error) => console.error(error)}
      />
    </Container>
  );
}
