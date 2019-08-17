import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Meetup from '~/components/Meetup';
import Header from '~/components/Header';

import { Container, Title, List, DateView } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');

      setMeetups(response.data);
    }

    loadMeetups();
  }, []);

  async function handleSubmit(id) {
    try {
      setLoading(true);
      await api.post(`meetups/${id}/subscriptions`);
      Alert.alert(
        'Inscrito com sucesso',
        'Sua inscrição foi realizada com sucesso'
      );
    } catch (error) {
      const message = String(error.response.data.message);
      Alert.alert('Ops!', message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Header />
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
        renderItem={({ item }) => (
          <Meetup
            data={item}
            loading={loading}
            handleSubmit={() => handleSubmit(item.id)}
          />
        )}
      />
    </Container>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
