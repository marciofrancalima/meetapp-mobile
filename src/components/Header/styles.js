import styled from 'styled-components/native';

import logo from '~/assets/logo.png';

export const Container = styled.SafeAreaView`
  height: 64px;
  padding: 20px 0 0;

  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

export const Content = styled.View`
  background: #241528;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  height: 26px;
  width: 25px;
`;
