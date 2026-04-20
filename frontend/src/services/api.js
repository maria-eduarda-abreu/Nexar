// src/services/api.js
// Camada de serviço — troque BASE_URL pelo endereço do seu Spring Boot
// e descomente as chamadas reais quando o backend estiver pronto.

import { INTERESTS }             from "../data/interests";
import { USER, MISSION, SKILLS_RADAR, SUGGESTED_CONNECTIONS } from "../data/dashboard";
import { CHALLENGES }            from "../data/challenges";
import { MENTORS }               from "../data/mentors";

// const BASE_URL = "http://localhost:8080/api";

// ── Helpers ──────────────────────────────────────────────────────────────────
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// ── Interests ────────────────────────────────────────────────────────────────

/**
 * GET /api/interests
 */
export async function fetchInterests() {
  await delay(300);
  return INTERESTS;
  // const res = await fetch(`${BASE_URL}/interests`);
  // return res.json();
}

/**
 * POST /api/users/{id}/interests
 */
export async function saveUserInterests(userId, interestIds) {
  await delay(200);
  return { success: true };
  // const res = await fetch(`${BASE_URL}/users/${userId}/interests`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ interestIds }),
  // });
  // return res.json();
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

/**
 * GET /api/dashboard?userId={id}
 */
export async function fetchDashboard(userId) {
  await delay(300);
  return { user: USER, mission: MISSION, skillsRadar: SKILLS_RADAR, suggestedConnections: SUGGESTED_CONNECTIONS };
  // const res = await fetch(`${BASE_URL}/dashboard?userId=${userId}`);
  // return res.json();
}

/**
 * POST /api/users/{id}/energy
 */
export async function saveEnergyStatus(userId, energyId) {
  await delay(150);
  return { success: true };
  // const res = await fetch(`${BASE_URL}/users/${userId}/energy`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ energyId }),
  // });
  // return res.json();
}

// ── Challenges ────────────────────────────────────────────────────────────────

/**
 * GET /api/challenges/{id}
 */
export async function fetchChallenge(challengeId) {
  await delay(200);
  return CHALLENGES.find((c) => c.id === challengeId) || null;
  // const res = await fetch(`${BASE_URL}/challenges/${challengeId}`);
  // return res.json();
}

/**
 * POST /api/challenges/{id}/answer
 */
export async function submitAnswer(challengeId, questionId, answerId) {
  await delay(150);
  const challenge = CHALLENGES.find((c) => c.id === challengeId);
  const question  = challenge?.questions.find((q) => q.id === questionId);
  const correct   = question?.correctId === answerId;
  return { correct, feedback: correct ? question?.feedbackCorrect : question?.feedbackWrong };
  // const res = await fetch(`${BASE_URL}/challenges/${challengeId}/answer`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ questionId, answerId }),
  // });
  // return res.json();
}

// ── Mentors ───────────────────────────────────────────────────────────────────

/**
 * GET /api/mentors?area={area}&search={q}
 */
export async function fetchMentors({ area = "Todos", search = "" } = {}) {
  await delay(250);
  return MENTORS.filter((m) => {
    const matchArea   = area === "Todos" || m.area === area;
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchArea && matchSearch;
  });
  // const params = new URLSearchParams({ area, search });
  // const res = await fetch(`${BASE_URL}/mentors?${params}`);
  // return res.json();
}

/**
 * POST /api/connections
 */
export async function connectWithMentor(userId, mentorId) {
  await delay(200);
  return { success: true };
  // const res = await fetch(`${BASE_URL}/connections`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ userId, mentorId }),
  // });
  // return res.json();
}
