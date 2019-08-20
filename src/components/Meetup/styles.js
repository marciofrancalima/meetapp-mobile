import styled from 'styled-components/native';

import Button from '../Button';

import colors from '~/styles/colors';

export const Container = styled.View`
  margin-bottom: 15px;

  border-radius: 4px;
  background: ${colors.tertiaryBackground};
`;

export const Banner = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 170px;
  align-content: stretch;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const Info = styled.View`
  margin-left: 15px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.secondaryText};
  margin-bottom: 10px;
`;

export const Content = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`;

export const Time = styled.Text`
  font-size: 13px;
  color: ${colors.tertiaryText};
  margin: 0 0 0 5px;
`;

export const Location = styled.Text`
  font-size: 13px;
  color: ${colors.tertiaryText};
  margin: 0 0 0 5px;
`;

export const Organizer = styled.Text`
  font-size: 13px;
  color: ${colors.tertiaryText};
  margin: 0 0 0 5px;
`;

export const SubmitButton = styled(Button)`
  margin: 15px;
  opacity: ${props => (props.past ? 0.3 : 1)};
`;

export const DoneWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
`;

export const Done = styled.Text`
  font-size: 14px;
  color: ${colors.secondaryText};
  font-weight: bold;
  margin-right: 5px;
`;
