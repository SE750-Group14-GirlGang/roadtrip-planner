import React from "react";
import styles from "../../../pages/DashboardPage/DashboardPage.module.css";
import GroupsList from "../commons/GroupsList/GroupsList";

export default function MyGroups() {
  let groups = [
    { _id: 2, name: "ROADI3" },
    { _id: 3, name: "Bay Of Islands" },
    { _id: 4, name: "Queenstown" },
    { _id: 5, name: "Seeing Manually" },
    { _id: 6, name: "Auckland" },
    { _id: 7, name: "Christchurch" },
  ];

  return (
    <div className={styles.section}>
      <h1>My Groups</h1>
      <GroupsList groups={groups} />
    </div>
  );
}
