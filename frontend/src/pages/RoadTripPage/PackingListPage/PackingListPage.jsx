import { React } from 'react';
import PackingList from '../../../components/PackingList/PackingList';
import styles from './PackingListPage.module.css';

export default function PackingListPage() {
  return (
    <div className={styles.packingListPage}>
      <p className={styles.title}>Packing List</p>
      <PackingList />
    </div>
  );
}
