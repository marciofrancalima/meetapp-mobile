import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
