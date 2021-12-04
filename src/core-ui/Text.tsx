import React from 'react';
import styled from 'styled-components';

type Props = {
  type?: 'large' | 'normal' | 'small';
  bold?: boolean;
  children?: any;
};

export default function Text(props: Props) {
  let { type = 'normal', ...otherProps } = props;

  return <StyledText {...otherProps} />;
}

const StyledText = styled.div`
  font-size: ${({ type }: Props) => {
    switch (type) {
      case 'large':
        return '24px';
      case 'small':
        return '14px';
      default:
        return '18px';
    }
  }};
  font-weight: ${({ bold }: Props) => (bold ? 'bold' : 'normal')};
`;
