import React, { useState } from 'react';

import { Container, Message, ComboBoxContainer, ComboBox } from './styles';

import Button from '@components/Button';
import Logo from '@components/Logo';

type Props = {
  navigation: any;
};

export default function Dashboard({ navigation }: Props) {
  const [streaming, setStreaming] = useState('');

  const handleMovie = () => {
    navigation.navigate('MovieDetail', { streaming });
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
          onValueChange={(itemValue: string) => setStreaming(itemValue)}>
          <ComboBox.Item label="Netflix" value="netflix" />
          <ComboBox.Item label="Prime Vídeo" value="primevideo" />
          <ComboBox.Item label="Disney +" value="disneyplus" />
          <ComboBox.Item label="Star +" value="starplus" />
          <ComboBox.Item label="Paramount +" value="paramountplus" />
          <ComboBox.Item label="Apple Tv" value="appletv" />
        </ComboBox>
      </ComboBoxContainer>
      <Button onPress={handleMovie}>PESQUISAR</Button>
    </Container>
  );
}
