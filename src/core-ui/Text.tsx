import React from 'react';
import styled from 'styled-components';

type Props = {
  type?: 'large' | 'normal' | 'small' | 'xsmall';
  color?: 'white';
  bold?: boolean;
  children?: any;
};

export default function Text(props: Props) {
  return <StyledText {...props} />
}

const StyledText = styled.div`
  font-size: ${({ type }: Props) => {
    switch (type) {
      case 'large':
        return '24px';
      case 'small':
        return '14px';
      case 'xsmall':
        return '12px';
      default:
        return '18px';
    }
  }};
  ${({ color }: Props) => (color === 'white' ? 'color: white;' : '')}
  font-weight: ${({ bold }: Props) => (bold ? 'bold' : 'normal')};
`;
