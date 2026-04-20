// src/pages/DashboardPage.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Avatar from "../components/Avatar";
import RadarChart from "../components/RadarChart";
import Button from "../components/Button";
import { useAsync } from "../hooks/useAsync";
import { fetchDashboard, saveEnergyStatus } from "../services/api";
import { ENERGY_OPTIONS } from "../data/dashboard";
import styles from "./DashboardPage.module.css";

export default function DashboardPage({ onNavigate }) {
  const [energy, setEnergy] = useState(null);
  const { data, loading } = useAsync(() => fetchDashboard(1));

  const handleEnergy = async (id) => {
    setEnergy(id);
    await saveEnergyStatus(1, id);
  };

  if (loading) return <LoadingState />;

  const { user, mission, skillsRadar, suggestedConnections } = data;

  return (
    <div className={styles.page}>
      <Header />
      <div className="page-content">

        {/* Greeting */}
        <h2 className={styles.greeting}>Olá, {user.name}!</h2>
        <hr className="divider" />

        {/* Mission card */}
        <div className={`card card--bordered ${styles.missionCard} animate-fade-in-up`}>
          <p className={styles.missionLabel}>Sua próxima <span>Missão</span></p>
          <p className={styles.missionSub}>{mission.subtitle}</p>
          <p className={styles.missionTitle}>{mission.title}</p>
          <p className={styles.missionDuration}>Duração: {mission.duration}</p>
          <Button fullWidth onClick={() => onNavigate("skills")}>
            Iniciar Tarefa
          </Button>
        </div>

        {/* Bem-Estar */}
        <div className={`card ${styles.wellnessCard} animate-fade-in-up`} style={{ animationDelay: "80ms" }}>
          <div className={styles.wellnessHeader}>
            <div className={styles.wellnessCircle} />
            <span className={styles.wellnessTitle}>Bússola de Bem-Estar</span>
          </div>
          <p className={styles.wellnessSub}>Seu status atual de energia:</p>
          <div className={styles.energyRow}>
            {ENERGY_OPTIONS.map((opt) => {
              const isActive = energy === opt.id;
              return (
                <button
                  key={opt.id}
                  className={`${styles.energyBtn} ${isActive ? styles.energyBtnActive : ""}`}
                  onClick={() => handleEnergy(opt.id)}
                >
                  <div className={`${styles.energyCircle} ${isActive ? styles.energyCircleActive : ""}`} />
                  <span className={styles.energyLabel}>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Radar */}
        <div className={`card ${styles.radarCard} animate-fade-in-up`} style={{ animationDelay: "140ms" }}>
          <p className={styles.radarTitle}>Radar de Habilidades Emergentes</p>
          <div className={styles.radarBody}>
            <div className={styles.radarSkills}>
              {skillsRadar.map((s) => (
                <p key={s.label} className={styles.radarSkillItem}>
                  <span className={styles.radarBullet}>◆</span> {s.label}
                </p>
              ))}
            </div>
            <RadarChart skills={skillsRadar} />
          </div>
        </div>

        {/* Conexões sugeridas */}
        <div className={`card ${styles.connectionsCard} animate-fade-in-up`} style={{ animationDelay: "200ms" }}>
          <p className={styles.connectionsTitle}>Conexões NEXAR Sugeridas</p>
          {suggestedConnections.map((c) => (
            <button
              key={c.id}
              className={styles.connectionItem}
              onClick={() => onNavigate("connections")}
            >
              <Avatar size={44} name={c.name} />
              <div>
                <p className={styles.connectionName}>{c.name}</p>
                <p className={styles.connectionRole}>{c.role}</p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div>
      <Header />
      <div className="page-content">
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
          {[120, 200, 180, 100].map((h, i) => (
            <div key={i} style={{
              height: h, borderRadius: 6,
              background: "linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.4s infinite",
            }} />
          ))}
        </div>
      </div>
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </div>
  );
}
