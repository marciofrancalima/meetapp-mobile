import styled from 'styled-components/native';

import Button from '../Button';

export const Container = styled.View`
  margin-bottom: 15px;

  border-radius: 4px;
  background: #fff;
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
  color: #333;
  margin-bottom: 10px;
`;

export const Content = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`;

export const Time = styled.Text`
  font-size: 13px;
  color: #999;
  margin: 0 0 0 5px;
`;

export const Location = styled.Text`
  font-size: 13px;
  color: #999;
  margin: 0 0 0 5px;
`;

export const Organizer = styled.Text`
  font-size: 13px;
  color: #999;
  margin: 0 0 0 5px;
`;

export const SubmitButton = styled(Button)`
  margin: 15px;
`;
