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

import { Container, Title, List, DateView, Loading } from './styles';

// Limit Per Page
const per_page = 5;

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dateFormatted = useMemo(() => formatDate(date), [date]);

  async function loadMeetups(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) {
      return;
    }

    setRefresh(true);

    const response = await api.get('meetups', {
      params: {
        per_page,
        page: pageNumber,
        date,
      },
    });

    const data = response.data.rows.map(meetup => {
      return {
        ...meetup,
        done: isDone(meetup.date),
      };
    });

    const totalItems = await response.data.count;

    setTotal(Math.ceil(totalItems / per_page));
    setMeetups(shouldRefresh ? data : [...meetups, ...data]);
    setPage(pageNumber + 1);
    setRefresh(false);
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

  function handlePrevDay() {
    setPage(1);
    setDate(prevDay(date));
    setMeetups([]);
  }

  function handleNextDay() {
    setPage(1);
    setDate(nextDay(date));
    setMeetups([]);
  }

  async function refreshList() {
    setRefreshing(true);
    await loadMeetups(1, true);
    setRefreshing(false);
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
            onEndReached={() => loadMeetups()}
            onEndReachedThreshold={0.1}
            onRefresh={refreshList}
            refreshing={refreshing}
            ListFooterComponent={refresh && <Loading />}
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
