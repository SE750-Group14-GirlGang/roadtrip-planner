import React from "react";
import styles from "../../../pages/DashboardPage/DashboardPage.module.css";
import GroupsList from "../commons/GroupsList/GroupsList";

export default function PendingGroups() {
  let groups = [{ _id: 1, name: "01/01/2022 USA" }];

  return (
    <div className={styles.section}>
      <h1>Pending Groups</h1>
      <GroupsList groups={groups} />
    </div>
  );
}
