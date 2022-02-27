import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Touchable = styled(TouchableOpacity)`
  background-color: #169ddb;
  padding: 12px;
  border: 1px solid #f1f1f1;
  border-radius: 16px;
  width: 180px;
  margin: 24px auto;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  text-shadow: 1px 1px 4px #4a4a4a;
`;
