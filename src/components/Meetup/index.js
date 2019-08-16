import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

export default function Meetup({ data }) {
  const dateParsed = useMemo(() => {
    return format(parseISO(data.date), "dd 'de' MMMM 'às' HH:mm", {
      locale: ptBR,
    });
  }, [data.date]);

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

      <SubmitButton>Realizar inscrição</SubmitButton>
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
  }).isRequired,
};
