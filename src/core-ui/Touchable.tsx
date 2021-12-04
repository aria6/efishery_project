import React from 'react';
import styled from 'styled-components';

type Props = {
  onClick: () => void;
  children?: any;
};

export default function Touchable({ onClick, ...otherProps }: Props) {
  return <TouchableContainer onClick={onClick} {...otherProps} />;
}

const TouchableContainer = styled.a`
  cursor: pointer;
`;
