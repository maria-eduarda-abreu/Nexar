// src/components/BottomNav.jsx
import React from "react";
import styles from "./BottomNav.module.css";

const NAV_ITEMS = [
  { key: "home",        label: "Home",      icon: "⊞" },
  { key: "dashboard",   label: "Dashboard", icon: "◉" },
  { key: "skills",      label: "Skills",    icon: "◈" },
  { key: "connections", label: "Conexões",  icon: "⊕" },
];

export default function BottomNav({ active, onNavigate }) {
  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
            onClick={() => onNavigate(item.key)}
            aria-label={item.label}
          >
            <span className={`${styles.icon} ${isActive ? styles.iconActive : ""}`}>
              {item.icon}
            </span>
            <span className={styles.label}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
