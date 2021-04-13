import React from 'react';
import styles from '../../styles/DashboardPage.module.css'
import GroupsList from "./GroupsList";

export default function PendingGroups() {
  let groupNames=["01/01/2022 USA"];

  return (
    <div className={styles.section}>
      <h1>Pending Groups</h1>
      <GroupsList groups={groupNames} />
    </div>
  );
}