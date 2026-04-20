// src/components/Button.jsx
import React from "react";
import styles from "./Button.module.css";

/**
 * @param {{ variant?: 'primary'|'secondary'|'ghost', fullWidth?: boolean, disabled?: boolean }} props
 */
export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  disabled = false,
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      className={[
        styles.btn,
        styles[variant],
        fullWidth ? styles.fullWidth : "",
        disabled ? styles.disabled : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
