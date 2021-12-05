import React from 'react';
import useSWR from 'swr';

import { Dropdown } from '../core-ui';
import { fetchAPI } from '../helpers';

type CitiesProps = {
  selectedProvince: string;
  city: string;
  onChange: (value: string) => void;
};

export default function Cities(props: CitiesProps) {
  let { selectedProvince, onChange, city } = props;
  let { data } = useSWR(
    `/api/getCities?province=${selectedProvince}`,
    fetchAPI
  );
  return (
    <Dropdown
      label='Kota :'
      options={data?.data ?? []}
      onChange={onChange}
      value={city}
    />
  );
}
