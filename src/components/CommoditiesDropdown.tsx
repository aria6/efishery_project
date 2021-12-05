import React from 'react';
import useSWR from 'swr';

import { Dropdown } from '../core-ui';
import { fetchAPI } from '../helpers';

type DropdownProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function Commodities({ onChange, value }: DropdownProps) {
  const { data } = useSWR(`/api/getCommodities`, fetchAPI);
  return (
    <Dropdown
      label='Komoditas :'
      options={data?.data ?? []}
      onChange={onChange}
      value={value}
    />
  );
}
