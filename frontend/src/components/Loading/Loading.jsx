import React from 'react';
import Spinner from '../commons/Spinner/Spinner';
import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.spinner}>
      <Spinner size={200} thickness={1.5} />
    </div>
  );
}
