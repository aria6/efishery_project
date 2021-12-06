import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

import Loading from './Loading';

import { GREEN, BORDER_GREY } from '../constants/colors';
import { currencyIDR, currencyDollar, fetchAPI } from '../helpers';

type Props = {
  province: string;
  city: string;
  commodity: string;
  size: string;
};

export default function TableEfisherList(props: Props) {
  let { province, city, commodity, size } = props;
  let { data, error } = useSWR(
    `/api/getFisheryList?province=${province}&city=${city}&commodity=${commodity}&size=${size}`,
    fetchAPI
  );

  if (!error && !data) {
    return <Loading />;
  }

  return (
    <TableContainer>
      <thead>
        <tr>
          <Th>No</Th>
          <Th>Komoditas</Th>
          <Th>Size</Th>
          <Th>Provinsi</Th>
          <Th>Kota</Th>
          <Th>Tanggal</Th>
          <Th>Harga (IDR)</Th>
          <Th>Harga (USD)</Th>
        </tr>
      </thead>
      <tbody>
        {data.list.map((data: FisheryItem, index: number) => {
          return (
            <tr key={`table${index}`}>
              <Td>{index + 1}</Td>
              <Td>{data.komoditas ?? '-'}</Td>
              <Td>{data.size ?? '-'}</Td>
              <Td>{data.area_provinsi ?? '-'}</Td>
              <Td>{data.area_kota ?? '-'}</Td>
              <Td>
                {data.tgl_parsed
                  ? new Date(data.tgl_parsed).toLocaleDateString('en-US', {
                      month: 'long',
                      day: '2-digit',
                      year: 'numeric',
                    })
                  : '-'}
              </Td>
              <Td>{data.price ? currencyIDR(Number(data.price)) : '-'}</Td>
              <Td>
                {data.usd_price ? currencyDollar(Number(data.usd_price)) : '-'}
              </Td>
            </tr>
          );
        })}
      </tbody>
    </TableContainer>
  );
}

const TableContainer = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 25px;
`;

const Th = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 8px;
  padding-left: 8px;
  text-align: left;
  background-color: ${GREEN};
  color: white;
  border: 1px solid ${BORDER_GREY};
`;

const Td = styled.td`
  border: 1px solid ${BORDER_GREY};
  padding: 8px;
`;
