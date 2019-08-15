import React from 'react';
import { Text } from 'react-native';

import { Container } from './styles';

export default function Profile() {
  return (
    <Container>
      <Text>Meu perfil</Text>
    </Container>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
};
