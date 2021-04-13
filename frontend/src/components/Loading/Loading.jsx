import React from "react";
import styles from "./Loading.module.css";
const loadingImg =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

export default function Loading() {
  return (
    <div className={styles.spinner}>
      <img src={loadingImg} alt="Loading..." />
    </div>
  );
}
