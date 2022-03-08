import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const Message = styled.Text`
  font-size: 14px;
  width: 80%;
  text-align: center;
`;

export const ComboBoxContainer = styled.View`
  border: 1px solid #169ddb;
  border-radius: 8px;
  height: 46px;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background-color: #fff;
`;

export const ComboBox = styled(Picker)`
  width: 250px;
`;
