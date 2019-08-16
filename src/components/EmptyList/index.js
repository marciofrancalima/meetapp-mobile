import React from 'react';

import { Container, Text } from './styles';

export default function EmptyList({ children }) {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  );
}
