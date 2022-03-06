import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Message } from './styles';

export default function Loading({ ...props }) {
  return (
    <Container>
      <ActivityIndicator size="large" color="#169ddb" />
      <Message>{props.title ? props.title : 'Carregando...'}</Message>
    </Container>
  );
}
