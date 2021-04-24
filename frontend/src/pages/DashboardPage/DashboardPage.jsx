import React from 'react';
import styles from './DashboardPage.module.css'
import TopBar from "../../components/TopBar/TopBar";
import GroupsSection from "../../components/dashboard/GroupSection/GroupsSection";

export default function DashboardPage() {
  let myGroups = [
    { _id: 2, name: "ROADI3" },
    { _id: 3, name: "Bay Of Islands" },
    { _id: 4, name: "Queenstown" },
    { _id: 5, name: "Seeing Manually" },
    { _id: 6, name: "Auckland" },
    { _id: 7, name: "Christchurch" },
  ];

  let pendingGroups = [
    { _id: 1, name: "01/01/2022 USA" }
  ];

  return (
    <div className={styles.dashboard}>
      <TopBar/>
      <GroupsSection title='My Groups' groups={myGroups} disable={false}/>
      <GroupsSection title='Pending Groups' groups={pendingGroups} disable={true}/>
    </div>
  );
}