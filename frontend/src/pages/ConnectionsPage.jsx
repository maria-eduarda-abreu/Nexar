// src/pages/ConnectionsPage.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import { fetchMentors, connectWithMentor } from "../services/api";
import { FILTER_AREAS } from "../data/mentors";
import styles from "./ConnectionsPage.module.css";

export default function ConnectionsPage() {
  const [mentors,    setMentors]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [filter,     setFilter]     = useState("Todos");
  const [search,     setSearch]     = useState("");
  const [connected,  setConnected]  = useState([]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchMentors({ area: filter, search }).then((data) => {
      if (!cancelled) { setMentors(data); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, [filter, search]);

  const handleConnect = async (mentorId) => {
    await connectWithMentor(1, mentorId);
    setConnected((prev) =>
      prev.includes(mentorId) ? prev.filter((x) => x !== mentorId) : [...prev, mentorId]
    );
  };

  return (
    <div className={styles.page}>
      <Header />
      <div className="page-content">

        <h2 className={styles.pageTitle}>Conexões NEXAR</h2>
        <p className={styles.pageSubtitle}>Encontre mentores para sua jornada</p>

        {/* Search */}
        <div className={styles.searchBox}>
          <SearchIcon />
          <input
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por habilidades ou área..."
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => setSearch("")}>✕</button>
          )}
        </div>
        <hr className="divider--light" style={{ borderTop: "1px solid #eee", margin: "12px 0" }} />

        {/* Filters */}
        <p className={styles.filterLabel}>Filtrar por:</p>
        <div className={styles.filterRow}>
          {FILTER_AREAS.map((area) => (
            <button
              key={area}
              className={`${styles.filterBtn} ${filter === area ? styles.filterBtnActive : ""}`}
              onClick={() => setFilter(area)}
            >
              {area}
            </button>
          ))}
        </div>
        <hr className="divider--light" style={{ borderTop: "1px solid #eee", margin: "12px 0" }} />

        {/* Results */}
        {loading ? (
          <MentorSkeletons />
        ) : mentors.length === 0 ? (
          <p className={styles.emptyState}>Nenhum mentor encontrado.</p>
        ) : (
          <div className={styles.mentorList}>
            {mentors.map((mentor, idx) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                isConnected={connected.includes(mentor.id)}
                onConnect={() => handleConnect(mentor.id)}
                delay={idx * 60}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

function MentorCard({ mentor, isConnected, onConnect, delay }) {
  return (
    <div
      className={`${styles.mentorCard} animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Top */}
      <div className={styles.mentorTop}>
        <Avatar size={52} name={mentor.name} />
        <div className={styles.mentorInfo}>
          <p className={styles.mentorName}>{mentor.name}</p>
          <p className={styles.mentorRole}>{mentor.role}</p>
          <div className={styles.tagRow}>
            {mentor.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <hr className="divider--light" style={{ borderTop: "1px solid #eee", margin: "10px 0" }} />

      {/* Meta */}
      <div className={styles.mentorMeta}>
        <div className={styles.availability}>
          <span
            className={styles.dot}
            style={{ background: mentor.available ? "var(--color-success)" : "var(--color-error)" }}
          />
          <span>{mentor.available ? "Disponível" : "Indisponível"}</span>
        </div>
        <span className={styles.match}>
          Match: <strong>{mentor.match}%</strong>
        </span>
      </div>

      {/* Actions */}
      <div className={styles.mentorActions}>
        <Button variant="secondary">Ver Perfil</Button>
        <Button onClick={onConnect}>
          {isConnected ? "Conectado ✓" : "Conectar"}
        </Button>
      </div>
    </div>
  );
}

function MentorSkeletons() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{
          height: 180, borderRadius: 6,
          background: "linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.4s infinite",
        }} />
      ))}
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
