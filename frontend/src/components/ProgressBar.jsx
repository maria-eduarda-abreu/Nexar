
import React from "react";
import styles from "./ProgressBar.module.css";

/**
 * @param {{ steps: number, currentStep: number }} props  — step-based bar
 * @param {{ value: number }}                             — percentage bar (0–100)
 */
export default function ProgressBar({ steps, currentStep, value }) {
  if (steps !== undefined) {
    return (
      <div className={styles.stepsWrapper}>
        {Array.from({ length: steps }, (_, i) => (
          <div
            key={i}
            className={`${styles.step} ${i < currentStep ? styles.stepFilled : ""}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.bar}>
      <div
        className={styles.fill}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
