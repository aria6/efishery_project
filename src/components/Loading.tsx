import React from 'react';
import styled from 'styled-components';

import { Text } from '../core-ui';

export default function Loading() {
  return (
    <LoadingContainer>
      <Text>Loading</Text>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
