import React from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { Text, Touchable } from '../core-ui';
import { GREEN_EFISHERY } from '../constants/colors';

const MENU = [
  {
    label: 'Summary',
    path: '/',
  },
  {
    label: 'eFishery List',
    path: '/efishery_list',
  },
];

type MItemProps = {active: boolean};

export default function Header() {
  let router = useRouter();

  return (
    <HeaderContainer>
      <LeftComponent>
        <Image
          alt='Efishery logo'
          src='/assets/images/efishery-logo.png'
          width='180'
          height='60'
        />
        {MENU.map((item) => (
          <MenuItem<any> active={router.pathname === item.path} key={item.path}>
            <Touchable onClick={() => router.replace(item.path)}>
              <Text bold>{item.label}</Text>
            </Touchable>
          </MenuItem>
        ))}
      </LeftComponent>
      <RightComponent />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  color: ${({ active }: MItemProps) => (active ? GREEN_EFISHERY : 'black')};

  &:hover {
    color: ${GREEN_EFISHERY};
  }
`;

const LeftComponent = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const RightComponent = styled.div`
  display: flex;
  flex: 1;
`;
