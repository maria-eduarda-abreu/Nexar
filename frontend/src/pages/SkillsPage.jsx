// src/pages/SkillsPage.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
import { useTimer } from "../hooks/useTimer";
import { useAsync } from "../hooks/useAsync";
import { fetchChallenge, submitAnswer } from "../services/api";
import styles from "./SkillsPage.module.css";

export default function SkillsPage({ onNavigate }) {
  const { data: challenge, loading } = useAsync(() => fetchChallenge("c1"));
  const [currentQ, setCurrentQ]     = useState(0);
  const [selected,  setSelected]    = useState(null);
  const [feedback,  setFeedback]    = useState(null); // { correct, message }
  const { minutes, seconds }        = useTimer(288);

  const question = challenge?.questions[currentQ];
  const progress = question
    ? ((currentQ + 1) / challenge.totalQuestions) * 100
    : 0;

  const handleSelect = async (optionId) => {
    if (selected !== null) return; // already answered
    setSelected(optionId);
    const result = await submitAnswer("c1", question.id, optionId);
    setFeedback({ correct: result.correct, message: result.feedback });
  };

  const handleNext = () => {
    const hasMore = currentQ < (challenge?.questions.length ?? 0) - 1;
    if (hasMore) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setFeedback(null);
    } else {
      onNavigate("dashboard");
    }
  };

  if (loading || !challenge) return <SkillsLoading />;

  return (
    <div className={styles.page}>
      <Header />
      <div className="page-content">

        <h2 className={styles.pageTitle}>Ginásio de Skills</h2>
        <hr className="divider" />

        {/* Timer row */}
        <div className={styles.timerRow}>
          <span className={styles.challengeName}>{challenge.title}</span>
          <div className={styles.timer}>
            <ClockIcon />
            <span>{minutes}:{seconds}</span>
          </div>
        </div>

        {/* Progress */}
        <ProgressBar value={progress} />
        <p className={styles.questionCount}>
          Questão {currentQ + 1} de {challenge.totalQuestions}
        </p>
        <hr className="divider--light" style={{ borderTop: "1px solid #eee", margin: "0 0 16px" }} />

        {/* Scenario */}
        <div className={`card card--bordered ${styles.scenarioCard} animate-fade-in`}>
          <p className={styles.scenarioHeader}>
            <strong>Cenário de Desafio:</strong>{" "}
            <span className={styles.scenarioTitle}>{question.scenario}</span>
          </p>
          <hr className="divider--light" style={{ borderTop: "1px solid #ddd", margin: "10px 0" }} />
          <p className={styles.scenarioText}>{question.description}</p>
        </div>

        {/* Options */}
        <p className={styles.optionsLabel}>Escolha a melhor resposta:</p>
        <div className={styles.options}>
          {question.options.map((opt) => {
            const isSelected = selected === opt.id;
            const isCorrect  = opt.id === question.correctId;
            const showResult = feedback !== null && isSelected;

            return (
              <button
                key={opt.id}
                className={[
                  styles.option,
                  isSelected ? styles.optionSelected : "",
                  showResult && isCorrect  ? styles.optionCorrect  : "",
                  showResult && !isCorrect ? styles.optionWrong    : "",
                ].filter(Boolean).join(" ")}
                onClick={() => handleSelect(opt.id)}
                disabled={selected !== null}
              >
                <div className={`${styles.optionRadio} ${isSelected ? styles.optionRadioFilled : ""}`} />
                <span className={styles.optionText}>{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`${styles.feedback} ${feedback.correct ? styles.feedbackCorrect : styles.feedbackWrong} animate-fade-in`}>
            <span className={styles.feedbackIcon}>
              {feedback.correct ? "✓" : "✕"}
            </span>
            <div>
              <p className={styles.feedbackTitle}>
                {feedback.correct ? "Correto!" : "Tente Novamente"}
              </p>
              <p className={styles.feedbackMsg}>{feedback.message}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          <Button variant="secondary" onClick={() => onNavigate("dashboard")}>
            Pular
          </Button>
          <Button
            onClick={handleNext}
            disabled={!feedback?.correct}
          >
            Próxima
          </Button>
        </div>

      </div>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function SkillsLoading() {
  return (
    <div>
      <Header />
      <div className="page-content" style={{ paddingTop: 20 }}>
        <div style={{ height: 28, background: "#eee", borderRadius: 4, marginBottom: 16, width: "60%" }} />
        <div style={{ height: 160, background: "#eee", borderRadius: 6, marginBottom: 12 }} />
        <div style={{ height: 60, background: "#eee", borderRadius: 6, marginBottom: 10 }} />
        <div style={{ height: 60, background: "#eee", borderRadius: 6, marginBottom: 10 }} />
      </div>
    </div>
  );
}
