import React from 'react';
import useSWR from 'swr';

import { Dropdown } from '../core-ui';
import { fetchAPI } from '../helpers';

type DropdownProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function Provincies({ onChange, value }: DropdownProps) {
  let { data } = useSWR(`/api/getProvincies`, fetchAPI);
  return (
    <Dropdown
      label='Provinsi :'
      options={data?.data ?? []}
      onChange={onChange}
      value={value}
    />
  );
}
