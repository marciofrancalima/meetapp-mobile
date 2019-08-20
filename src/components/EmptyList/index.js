import React from 'react';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function EmptyList({ children }) {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  );
}

EmptyList.propTypes = {
  children: PropTypes.string.isRequired,
};
