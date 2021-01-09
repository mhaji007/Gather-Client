import styles from "./alerts.module.css";

export const showSuccessMessage = (success) => (
  <div className={`alert alert-success mt-0 ${styles.cstmAlert}`}>{success}</div>
);
export const showErrorMessage = (error) => (
  <div className={`alert alert-danger mt-0 ${styles.cstmAlert}`}>{error}</div>
);

