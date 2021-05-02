import { React } from 'react';
import PackingList from '../../../components/PackingList/PackingList';
import styles from './PackingListPage.module.css';

import Spinner from '../../../components/commons/Spinner/Spinner';

import useGet from '../../../hooks/useGet';

export default function PackingListPage() {
  // const { response: packingListResponse, loading: packingListLoading, error: packingListError } = useGet(
  //   `./api/roadtrip/${id}/packinglist`
  // );

  // const { response: packedItemsResponse, loading: packedItemsLoading, error: packedItemsError } = useGet(
  //   `./api/roadtrip/${id}/packinglist`
  // );
  const packingListLoading = false;
  const packedItemsLoading = false;

  // const packingListResponse = {
  //   data: [
  //     'sleeping bag',
  //     'sleeping mat',
  //     'rain jacket',
  //     'pillow',
  //     'alcohol',
  //     'clothing',
  //     'cutlery',
  //     'towel',
  //     'togs',
  //     'phone charger',
  //     'ear plugs',
  //     'hoons',
  //     'bowl',
  //   ],
  // };
  const packingListResponse = { data: [] };

  const packedItemsResponse = { data: ['sleeping bag', 'hoons', 'alcohol', 'ear plugs'] };
  // const packedItemsResponse = { data: [] };

  const isLoading = packingListLoading || packedItemsLoading;

  return (
    <div className={styles.packingListPage}>
      <p className={styles.title}>Packing List</p>
      {isLoading && <Spinner />}
      {!isLoading && <PackingList packingList={packingListResponse?.data} packedItems={packedItemsResponse?.data} />}
    </div>
  );
}
