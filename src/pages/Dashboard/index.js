import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Meetup from '~/components/Meetup';
import Header from '~/components/Header';
import EmptyList from '~/components/EmptyList';
import Background from '~/components/Background';

import { formatDate, isDone, prevDay, nextDay } from '~/util/dateUtils';

import { Container, Title, List, DateView } from './styles';

// Limit Per Page
const per_page = 5;

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);

  const dateFormatted = useMemo(() => formatDate(date), [date]);

  function handlePrevDay() {
    setDate(prevDay(date));
  }

  function handleNextDay() {
    setDate(nextDay(date));
  }

  async function loadMeetups() {
    const response = await api.get('meetups', {
      params: {
        per_page,
        page,
        date,
      },
    });

    const data = response.data.rows.map(meetup => {
      return {
        ...meetup,
        done: isDone(meetup.date),
      };
    });

    setMeetups(data);
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused, date]);

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
    <Background>
      <Container>
        <Header />
        <DateView>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>

          <Title>{dateFormatted}</Title>

          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </DateView>

        {meetups.length === 0 ? (
          <EmptyList>Nenhum meetup encontrado</EmptyList>
        ) : (
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
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
