import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #402845;
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
