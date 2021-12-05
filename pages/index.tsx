import React, { useState, useCallback } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';
import styled from 'styled-components';
import styles from '../styles/Home.module.css';

import { Text, Touchable } from '../src/core-ui';
import {
  Header,
  InformationBox,
  ProvinciesDropdown,
  CitiesDropdown,
  CommoditiesDropdown,
} from '../src/components';
import PercentileBox from '../src/scenes/SummaryPage/components/PercentileBox';

import { fetchAPI, currencyIDR } from '../src/helpers';
import { GREEN } from '../src/constants/colors';

const Home: NextPage = () => {
  let [province, setProvince] = useState('');
  let [city, setCity] = useState('');
  let [commodity, setCommodity] = useState('');
  let [percentileParam, setPercentileParam] = useState('size');

  let onClearAllPress = useCallback(() => {
    setProvince('');
    setCity('');
    setCommodity('');
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>eFishery Project</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Body>
        <FilterBox>
          <FilterHeader>
            <Text color='white' bold>
              Filter
            </Text>
            <ClearAllWrapper onClick={onClearAllPress}>
              <Text type='xsmall' color='white'>
                Clear All
              </Text>
            </ClearAllWrapper>
          </FilterHeader>
          <FilterBody>
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
          </FilterBody>
        </FilterBox>
        <SummaryBox
          province={province}
          city={city}
          commodity={commodity}
          percentileParam={percentileParam}
          setPercentileParam={setPercentileParam}
        />
      </Body>
    </div>
  );
};

type SummaryBoxProps = {
  province: string;
  city: string;
  commodity: string;
  percentileParam: string;
  setPercentileParam: (value: string) => void;
};

function SummaryBox(props: SummaryBoxProps) {
  let { province, city, commodity, percentileParam, setPercentileParam } =
    props;
  let { data, error } = useSWR(
    `/api/getFisherySummary?province=${province}&city=${city}&commodity=${commodity}&percentile_param=${percentileParam}`,
    fetchAPI
  );

  return (
    <RightContent>
      <SummaryHeader>
        <Text color='white' bold>
          Detail
        </Text>
      </SummaryHeader>
      {!error && !data ? (
        <LoadingContainer>
          <Text>Loading</Text>
        </LoadingContainer>
      ) : (
        <SummaryBody>
          <SummaryWrapper>
            <InformationBox label='Jumlah Data' value={data.totalData} />
            <InformationBox
              label='Harga Tertinggi'
              value={currencyIDR(data.maxPrice)}
            />
            <InformationBox
              label='Harga Terendah'
              value={currencyIDR(data.minPrice)}
            />
          </SummaryWrapper>
          <SummaryWrapper>
            <InformationBox label='Ukuran Tertinggi' value={data.maxSize} />
            <InformationBox label='Ukuran Terendah' value={data.minSize} />
          </SummaryWrapper>
          <PercentileBox
            percentileLength={data.percentileLength}
            percentile={data.percentile || []}
            onPercentilParamChange={(value) => setPercentileParam(value)}
            percentileParam={percentileParam}
          />
        </SummaryBody>
      )}
    </RightContent>
  );
}

const FilterHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  alignitems: center;
  padding: 10px;
  background-color: ${GREEN};
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const SummaryHeader = styled.div`
  padding: 10px;
  background-color: ${GREEN};
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const SummaryBody = styled.div`
  padding: 10px;
`;

const FilterBody = styled.div`
  padding: 10px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Space = styled.div`
  height: 10px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
`;

const ClearAllWrapper = styled(Touchable)`
  display: flex;
  align-items: center;
`;

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const RightContent = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 3px 5px 10px 0px rgb(0 0 0 / 15%);
`;

const FilterBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 3px 5px 10px 0px rgb(0 0 0 / 15%);
  margin-right: 10px;
`;

export default Home;
