import { React } from 'react';
import { useParams } from 'react-router-dom';
import PackingList from '../../../components/PackingList/PackingList';
import styles from './PackingListPage.module.css';

import Spinner from '../../../components/commons/Spinner/Spinner';

import useGet from '../../../hooks/useGet';

export default function PackingListPage() {
  const { id } = useParams();

  const { response: packingListResponse, loading: packingListLoading } = useGet(`/api/roadtrip/${id}/packinglist`);

  // const { response: packedItemsResponse, loading: packedItemsLoading, error: packedItemsError } = useGet(
  //   `./api/roadtrip/${id}/packeditems`
  // );
  const packedItemsLoading = false;

  const packedItemsResponse = { data: { items: [] } };

  const isLoading = packingListLoading || packedItemsLoading;

  return (
    <div className={styles.packingListPage}>
      <p className={styles.title}>Packing List</p>
      {isLoading && <Spinner />}
      {!isLoading && (
        <PackingList
          startingPackingList={packingListResponse?.data?.items || []}
          startingPackedItems={packedItemsResponse?.data?.items || []}
        />
      )}
    </div>
  );
}
