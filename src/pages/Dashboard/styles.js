import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #402845;
  flex: 1;
`;

export const DateView = styled.View`
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin: 0 15px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
