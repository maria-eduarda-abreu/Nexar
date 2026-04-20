// src/pages/InterestsPage.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
import { INTERESTS, MIN_INTERESTS } from "../data/interests";
import { saveUserInterests } from "../services/api";
import styles from "./InterestsPage.module.css";

export default function InterestsPage({ onComplete }) {
  const [selected, setSelected] = useState([]);
  const [loading,  setLoading]  = useState(false);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const canContinue = selected.length >= MIN_INTERESTS;

  const handleContinue = async () => {
    if (!canContinue) return;
    setLoading(true);
    await saveUserInterests(1, selected);
    setLoading(false);
    onComplete(selected);
  };

  return (
    <div className={styles.page}>
      <Header />

      <div className="page-content">
        {/* Welcome card */}
        <div className={`card card--bordered ${styles.welcomeCard} animate-fade-in-up`}>
          <p className={styles.welcomeTitle}>Bem-vinda(o) ao <span>NEXAR</span></p>
          <p className={styles.welcomeSub}>
            Selecione seus interesses para personalizar sua jornada
          </p>
        </div>

        {/* Progress */}
        <div className={styles.progressSection}>
          <ProgressBar steps={3} currentStep={1} />
          <p className={styles.progressLabel}>Etapa 1 de 3</p>
        </div>

        <p className={styles.instruction}>
          Escolha pelo menos {MIN_INTERESTS} áreas de interesse:
        </p>

        {/* Grid */}
        <div className={styles.grid}>
          {INTERESTS.map((item, idx) => {
            const isSelected = selected.includes(item.id);
            return (
              <button
                key={item.id}
                className={`${styles.interestCard} ${isSelected ? styles.interestCardSelected : ""}`}
                onClick={() => toggle(item.id)}
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className={`${styles.checkbox} ${isSelected ? styles.checkboxSelected : ""}`}>
                  {isSelected && <span className={styles.checkmark}>✓</span>}
                </div>
                <span className={styles.interestIcon}>{item.icon}</span>
                <span className={styles.interestLabel}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky CTA */}
      <div className={styles.ctaBar}>
        <Button
          fullWidth
          disabled={!canContinue || loading}
          onClick={handleContinue}
        >
          {loading
            ? "Salvando..."
            : `Continuar (${selected.length}/${MIN_INTERESTS} selecionados)`}
        </Button>
      </div>
    </div>
  );
}
