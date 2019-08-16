import React, { useState, useEffect } from 'react';
import { Alert, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import MySubscription from '~/components/MySubscription';
import EmptyList from '~/components/EmptyList';

import { Container, List } from './styles';

export default function Subscription() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSubscriptions() {
      const response = await api.get('subscriptions');

      setSubscriptions(response.data);
    }

    loadSubscriptions();
  }, []);

  async function onCancel(id) {
    try {
      setLoading(true);
      await api.delete(`subscriptions/${id}`);
      Alert.alert('Cancelado', 'Sua inscrição foi cancelada com sucesso');
    } catch (error) {
      const message = String(error.response.data.message);
      Alert.alert('Ops!', message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      {subscriptions.length === 0 ? (
        <EmptyList>Você não está inscrito em nenhum meetup</EmptyList>
      ) : (
        <List
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MySubscription
              data={item}
              onCancel={() => onCancel(item.id)}
              loading={loading}
            />
          )}
        />
      )}
    </Container>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
