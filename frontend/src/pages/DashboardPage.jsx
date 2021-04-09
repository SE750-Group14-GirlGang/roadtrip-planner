import React from 'react';
import styles from '../styles/Dashboard.module.css'
import TopBar from "../components/TopBar";
import MyGroups from "../components/dashboard/MyGroups";
import PendingGroups from "../components/dashboard/PendingGroups";

export default function Dashboard() {
    return (
      <div className={styles.dashboard}>
          <TopBar />
          <MyGroups />
          <PendingGroups />
      </div>
    );
}