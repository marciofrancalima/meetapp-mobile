import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { formatDateWithHour } from '~/util/dateUtils';

import {
  Container,
  Banner,
  Info,
  Content,
  Title,
  Time,
  Location,
  Organizer,
  SubmitButton,
} from './styles';

export default function MySubscription({ data, onCancel, loading }) {
  const dateParsed = useMemo(() => formatDateWithHour(data.Meetup.date), [
    data.Meetup.date,
  ]);

  return (
    <Container>
      <Banner
        source={{
          uri: data.Meetup.banner
            ? data.Meetup.banner.url
            : `https://api.adorable.io/avatars/50/${data.Meetup.User.name}.png`,
        }}
      />

      <Info>
        <Title>{data.Meetup.title}</Title>
        <Content>
          <Icon name="event" size={16} color="#999" />
          <Time>{dateParsed}</Time>
        </Content>
        <Content>
          <Icon name="location-on" size={16} color="#999" />
          <Location>{data.Meetup.location}</Location>
        </Content>
        <Content>
          <Icon name="person" size={16} color="#999" />
          <Organizer>Organizador: {data.Meetup.User.name}</Organizer>
        </Content>
      </Info>

      <SubmitButton loading={loading} onPress={onCancel}>
        Cancelar inscrição
      </SubmitButton>
    </Container>
  );
}

MySubscription.propTypes = {
  data: PropTypes.shape({
    Meetup: PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      User: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      banner: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
    }),
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

MySubscription.defaultProps = {
  loading: false,
};
