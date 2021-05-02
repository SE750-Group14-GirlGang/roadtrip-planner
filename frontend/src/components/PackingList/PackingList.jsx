import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PackingList.module.css';

import AddButton from '../commons/buttons/AddButton/AddButton';
import Item from './Item/Item';
import AddItemModal from './AddItemModal/AddItemModal';

import usePut from '../../hooks/usePut';

const userIsOrganiser = true;

export default function PackingList({ startingPackingList, startingPackedItems }) {
  const { id } = useParams();

  const put = usePut();

  const [packingList, setPackingList] = useState(startingPackingList);
  const [packedItems, setPackedItems] = useState(startingPackedItems);

  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [submitItemError, setSubmitItemError] = useState(false);

  const handleOpenAddItemModal = () => {
    setAddItemModalOpen(true);
  };

  const handleCloseAddItemModal = () => {
    setAddItemModalOpen(false);
    setSubmitItemError(false);
  };

  const handleChange = async (item) => {
    let newPackedItems = [...packedItems];
    if (packedItems.includes(item)) {
      newPackedItems = newPackedItems.filter((e) => e !== item); // unchecking the item
    } else {
      newPackedItems.push(item); // checking the item
    }
    setPackedItems(newPackedItems);
    await put(`/api/roadtrip/${id}/packeditems/user`, { items: newPackedItems });
  };

  const handleSubmitItem = async (item) => {
    const newPackingList = [...packingList, item];
    const { error } = await put(`/api/roadtrip/${id}/packinglist`, { items: newPackingList });
    if (error) {
      setSubmitItemError(true);
    } else {
      handleCloseAddItemModal();
      setPackingList(newPackingList);
    }
  };

  return (
    <>
      <div className={styles.container}>
        {packingList.length ? (
          <div className={styles.cardContent}>
            {packingList.map((item, index) => (
              <div key={index}>
                <Item name={item} checked={packedItems.includes(item)} onChange={() => handleChange(item)} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyText}>The organiser has not added any items to the packing list yet!</div>
        )}
        <div className={styles.buttonContainer}>
          {userIsOrganiser && <AddButton onClick={handleOpenAddItemModal}>Add Item</AddButton>}
        </div>
      </div>
      <AddItemModal
        open={addItemModalOpen}
        onClose={handleCloseAddItemModal}
        onSubmit={handleSubmitItem}
        error={submitItemError}
      />
    </>
  );
}
