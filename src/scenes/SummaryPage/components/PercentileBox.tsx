import React from 'react';
import styled from 'styled-components';

import { Text, Dropdown } from '../../../core-ui';

const percentileOptions = [
  { value: 'price', label: 'Harga' },
  { value: 'size', label: 'Ukuran' },
];

type Props = {
  percentileLength: number;
  percentile: Array<number>;
  percentileParam: string;
  onPercentilParamChange: (value: string) => void;
};

export default function PercentileBox(props: Props) {
  let {
    percentileParam,
    onPercentilParamChange,
    percentile,
    percentileLength,
  } = props;

  if (percentileLength < 1) {
    return (
      <PercentileWrapper>
        <Text type='small'>Tidak ada data yang ditemukan</Text>
      </PercentileWrapper>
    );
  }

  return (
    <>
      <PercentileBoxHeader>
        <div>
          <Text type='small' bold>
            Persentil diukur berdasarkan nilai <br />
          </Text>
          <Text type='small'>{percentileParam}</Text>
        </div>
        <Dropdown
          label='Parameter persentil :'
          options={percentileOptions}
          value={percentileParam}
          onChange={onPercentilParamChange}
        />
      </PercentileBoxHeader>
      <PercentileWrapper>
        {percentile.map((value, index) => {
          return (
            <Item key={`persentil-${index}`}>
              <Text type='small' bold>
                P{index + 1}
              </Text>
              <Space />
              <Text type='small'>{value}</Text>
            </Item>
          );
        })}
      </PercentileWrapper>
    </>
  );
}

const PercentileWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0px 0px 20px 8px rgb(0 0 0 / 15%);
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  margin: 10px;
`;

const PercentileBoxHeader = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  margin: 10px;
`;

const Item = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 2px 0px 2px rgb(0 0 0 / 15%);
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  margin: 10px;
`;

const Space = styled.div`
  height: 5px;
`;