import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const MovieImage = styled.Image`
  width: 200px;
  height: 250px;
  border: 1px solid #169ddb;
  margin: 16px auto;
`;

export const MovieTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  width: 80%;
  text-align: center;
`;

export const MovieDescription = styled.Text`
  font-size: 16px;
  width: 80%;
`;

export const MovieCast = styled.Text`
  font-size: 12px;
  width: 80%;
`;

export const MovieGenres = styled.Text`
  font-size: 12px;
  width: 80%;
`;

export const MovieRating = styled.Text`
  font-size: 12px;
  font-weight: bold;
  width: 80%;
  text-align: center;
`;

export const MovieStreaming = styled.View`
  width: 200px;
  height: 46px;
  border: 1px solid #169ddb;
  border-radius: 10px;
  margin: 16px auto;
`;
