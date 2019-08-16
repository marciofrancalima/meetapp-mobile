import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Meetup from '~/components/Meetup';

import { Container, Title, List, DateView } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');

      setMeetups(response.data);
    }

    loadMeetups();
  }, []);
  return (
    <Container>
      <DateView>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="chevron-left" size={30} color="#fff" />
        </TouchableOpacity>

        <Title>31 de Maio</Title>

        <TouchableOpacity onPress={() => {}}>
          <Icon name="chevron-right" size={30} color="#fff" />
        </TouchableOpacity>
      </DateView>

      <List
        data={meetups}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Meetup data={item} />}
      />
    </Container>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
};
