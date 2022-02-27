import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Touchable, Title } from './styles';

interface IProps extends TouchableOpacityProps {
  children: string;
}

const Button: React.ElementType<IProps> = ({ children, ...props }) => {
  return (
    <Touchable {...props}>
      <Title>{children}</Title>
    </Touchable>
  );
};
export default Button;
