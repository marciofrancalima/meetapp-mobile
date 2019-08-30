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
  DoneWrapper,
  Done,
} from './styles';

export default function Meetup({ data, handleSubmit, loading }) {
  const dateParsed = useMemo(() => formatDateWithHour(data.date), [data.date]);

  return (
    <Container>
      <Banner
        source={{
          uri: data.banner
            ? data.banner.url
            : `https://api.adorable.io/avatars/50/${data.User.name}.png`,
        }}
      />

      <Info>
        <Title>{data.title}</Title>
        <Content>
          <Icon name="event" size={16} color="#999" />
          <Time>{dateParsed}</Time>
        </Content>
        <Content>
          <Icon name="location-on" size={16} color="#999" />
          <Location>{data.location}</Location>
        </Content>
        <Content>
          <Icon name="person" size={16} color="#999" />
          <Organizer>Organizador: {data.User.name}</Organizer>
        </Content>
      </Info>

      {data.done ? (
        <DoneWrapper>
          <Done>Evento realizado</Done>
          <Icon name="check-circle" size={16} color="#2E8A36" />
        </DoneWrapper>
      ) : (
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Realizar inscrição
        </SubmitButton>
      )}
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string.isRequired,
    banner: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    User: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

Meetup.defaultProps = {
  loading: false,
};
