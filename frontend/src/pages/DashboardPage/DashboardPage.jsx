import React from 'react';
import styles from './DashboardPage.module.css'
import TopBar from "../../components/TopBar/TopBar";
import MyGroups from "../../components/dashboard/MyGroups/MyGroups";
import PendingGroups from "../../components/dashboard/PendingGroups/PendingGroups";

export default function DashboardPage() {
    return (
      <div className={styles.dashboard}>
          <TopBar />
          <MyGroups />
          <PendingGroups />
      </div>
    );
}