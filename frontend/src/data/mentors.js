// src/data/mentors.js
// Substituir por: GET /api/mentors?area={area}&search={q}

export const MENTORS = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Mentora em IA Generativa",
    tags: ["IA", "Machine Learning", "Python"],
    available: true,
    match: 95,
    area: "IA & Tecnologia",
  },
  {
    id: 2,
    name: "Tião Carreiro",
    role: "Analista de Dados",
    tags: ["Data Science", "Analytics", "SQL"],
    available: true,
    match: 82,
    area: "Análise de Dados",
  },
  {
    id: 3,
    name: "João Nelore",
    role: "Designer UX/UI Sênior",
    tags: ["Figma", "UX Research", "Prototipagem"],
    available: false,
    match: 78,
    area: "Design",
  },
  {
    id: 4,
    name: "Carla Mendes",
    role: "Especialista em Liderança",
    tags: ["Coaching", "Gestão", "Equipes"],
    available: true,
    match: 90,
    area: "Liderança",
  },
];

export const FILTER_AREAS = [
  "Todos",
  "IA & Tecnologia",
  "Liderança",
  "Design",
  "Análise de Dados",
];
