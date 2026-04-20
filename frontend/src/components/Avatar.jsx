// src/components/Avatar.jsx
import React from "react";
import styles from "./Avatar.module.css";

/**
 * Renders initials inside a circular avatar.
 * @param {{ name: string, size?: number }} props
 */
export default function Avatar({ name = "", size = 48 }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={styles.avatar}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
