import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';

import { Header, TableEfisherList } from '../src/components';

const EfisheryList: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <TableEfisherList />
    </div>
  );
};

export default EfisheryList;
