import React from 'react';

import Header from '~/components/Header';

import { Container, Text } from './styles';

export default function EmptyList({ children }) {
  return (
    <Container>
      <Header />
      <Text>{children}</Text>
    </Container>
  );
}
