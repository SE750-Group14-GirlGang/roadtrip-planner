import React from 'react';
import styles from '../styles/DashboardPage.module.css'
import TopBar from "../components/TopBar";
import MyGroups from "../components/dashboard/MyGroups";
import PendingGroups from "../components/dashboard/PendingGroups";

export default function DashboardPage() {
    return (
      <div className={styles.dashboard}>
          <TopBar />
          <MyGroups />
          <PendingGroups />
      </div>
    );
}