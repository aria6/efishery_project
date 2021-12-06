import React from 'react';
import useSWR from 'swr';

import { Dropdown } from '../core-ui';
import { fetchAPI } from '../helpers';

type DropdownProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SizeDropdown({ onChange, value }: DropdownProps) {
  let { data } = useSWR(`/api/getSize`, fetchAPI);
  return (
    <Dropdown
      label='Ukuran :'
      options={data?.data ?? []}
      onChange={onChange}
      value={value}
    />
  );
}
