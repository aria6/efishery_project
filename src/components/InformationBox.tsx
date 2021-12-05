import React from 'react';
import styled from 'styled-components';

import { Text } from '../core-ui';
import { BORDER_GREY } from '../constants/colors';

type Props = {
  label: string;
  value?: string;
};

export default function InformationBox(props: Props) {
  let { label, value = '-' } = props;

  return (
    <Container>
      <Label bold>{label}</Label>
      <Text>{value}</Text>
    </Container>
  );
}

const Label = styled(Text)`
  padding: 5px;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid ${BORDER_GREY};
  border-radius: 5px;
  box-shadow: 3px 5px 0px 0px rgb(0 0 0 / 15%);
  padding-bottom: 5px;
  margin: 10px;
`;
