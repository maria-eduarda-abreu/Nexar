// src/data/dashboard.js
// Substituir por: GET /api/dashboard?userId={id}

export const USER = {
  id: 1,
  name: "Usuário",
  avatar: null,
};

export const MISSION = {
  id: "m1",
  title: "Desafio de empatia para Líderes",
  duration: "15 min",
  subtitle: "Baseado nos seus interesses, a IA sugeriu:",
  challengeId: "c1",
};

export const SKILLS_RADAR = [
  { label: "IA Generativa",      value: 0.9  },
  { label: "Pens. Crítico",      value: 0.75 },
  { label: "Colaboração",        value: 0.85 },
  { label: "Resiliência",        value: 0.7  },
];

export const SUGGESTED_CONNECTIONS = [
  { id: 1, name: "Agostinho",    role: "Designer UX/UI" },
  { id: 2, name: "Márcio",  role: "Mentor em IA"  },
];

export const ENERGY_OPTIONS = [
  { id: "great",  label: "Ótimo"  },
  { id: "normal", label: "Normal" },
  { id: "low",    label: "Baixo"  },
];
