import React from "react";
import styles from "./index.module.css";

export default ({ children }) => (
  <main className={styles.container}>
    {children()}
  </main>
);
