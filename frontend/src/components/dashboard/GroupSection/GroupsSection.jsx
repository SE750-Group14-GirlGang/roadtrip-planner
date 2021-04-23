import React from "react";
import styles from "./GroupsSection.module.css";
import GroupsList from "../commons/GroupsList/GroupsList";

export default function GroupsSection({ title, groups, disable }) {
  return (
    <div className={styles.section}>
      <h1>{title}</h1>
      <GroupsList groups={groups} disable={disable} />
    </div>
  );
}
