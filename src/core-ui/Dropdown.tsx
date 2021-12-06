import React from 'react';
import styled from 'styled-components';

import { Text } from './';

type Options = {
  value: string;
  label: string;
};

type Props = {
  label?: string;
  value: string;
  options: Array<Options>;
  onChange: (value: string) => void;
};

export default function Dropdown(props: Props) {
  let { label, options = [], onChange , value} = props;
  return (
    <Container>
      <Label type='small'>{label}</Label>
      <Select onChange={(event) => onChange(event.target.value)} value={value}>
        <option value=''> - </option>
        {options?.map((item, index) => {
          return (
            <option
              value={item.value}
              key={`${item.value}-${index}`}
            >
              {item.label}
            </option>
          );
        })}
      </Select>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  min-width: 150px;
`;

const Label = styled(Text)`
  margin-bottom: 5px;
`;

const Select = styled.select`
  padding: 5px;
`;
