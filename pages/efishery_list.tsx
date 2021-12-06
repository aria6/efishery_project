import React, { useState, useCallback } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';

import { Text, Touchable } from '../src/core-ui';
import {
  Header,
  TableEfisherList,
  ProvinciesDropdown,
  CitiesDropdown,
  CommoditiesDropdown,
  SizeDropdown,
} from '../src/components';

const EfisheryList: NextPage = () => {
  let [province, setProvince] = useState('');
  let [city, setCity] = useState('');
  let [commodity, setCommodity] = useState('');
  let [size, setSize] = useState('');

  let onClearAllPress = useCallback(() => {
    setProvince('');
    setCity('');
    setCommodity('');
    setSize('');
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <FilterWrapper>
        <ProvinciesDropdown
          onChange={(value) => setProvince(value)}
          value={province}
        />
        <Space />
        <CitiesDropdown
          onChange={(value) => setCity(value)}
          selectedProvince={province}
          city={city}
        />
        <Space />
        <CommoditiesDropdown
          onChange={(value) => setCommodity(value)}
          value={commodity}
        />
        <Space />
        <SizeDropdown onChange={(value) => setSize(value)} value={size} />
        <Space />
        <ClearAllWrapper onClick={onClearAllPress}>
          <Text type='xsmall'>Clear All</Text>
        </ClearAllWrapper>
      </FilterWrapper>
      <TableEfisherList
        province={province}
        city={city}
        commodity={commodity}
        size={size}
      />
    </div>
  );
};

const Space = styled.div`
  width: 20px;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: right;
  margin-bottom: 10px;
`;

const ClearAllWrapper = styled(Touchable)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default EfisheryList;
