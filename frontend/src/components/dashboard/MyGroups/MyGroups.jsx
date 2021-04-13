import React from 'react';
import styles from '../../../pages/DashboardPage/DashboardPage.module.css'
import GroupsList from "../commons/GroupsList/GroupsList";

export default function MyGroups() {
  let groupNames=["ROADI3", "Bay Of Islands", "Queenstown", "Seeing Manually", "Auckland", "Christchurch"];

  return (
    <div className={styles.section}>
      <h1>My Groups</h1>
      <GroupsList groups={groupNames} />
    </div>
  );
}