import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const TextBold = styled.Text`
  font-weight: bold;
`;

export const MovieImage = styled.Image`
  width: 200px;
  height: 250px;
  margin: 16px auto;
`;

export const MovieTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  width: 80%;
  text-align: center;
  margin: 8px auto;
`;

export const MovieOriginalTitle = styled.Text`
  font-size: 12px;
  width: 80%;
  margin: 4px auto;
`;

export const MovieDescription = styled.Text`
  font-size: 16px;
  width: 80%;
  margin: 8px auto;
`;

export const MovieReleaseDate = styled.Text`
  font-size: 12px;
  width: 80%;
  margin: 4px auto;
`;

export const MovieGenres = styled.Text`
  font-size: 12px;
  width: 80%;
  margin: 4px auto;
`;

export const MovieCastContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 16px auto;
  width: 80%;
`;

export const MoviePersonContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 4px;
  padding: 4px;
`;

export const MovieCast = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin: auto 4px;
`;

export const MovieCastName = styled.Text`
  font-size: 10px;
  font-weight: bold;
`;

export const MovieCastCharacter = styled.Text`
  font-size: 10px;
`;

export const MovieRating = styled.Text`
  font-size: 12px;
  font-weight: bold;
  width: 80%;
  text-align: center;
`;

export const MovieStreamingContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 16px auto;
  flex-wrap: wrap;
  width: 80%;
`;

export const MovieStreaming = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  margin: auto 4px;
`;
