// src/data/challenges.js
// Substituir por: GET /api/challenges/{id}

export const CHALLENGES = [
  {
    id: "c1",
    title: "Desafio de Empatia",
    totalQuestions: 4,
    durationSeconds: 288, // 4:48
    questions: [
      {
        id: "q1",
        scenario: "Conflito na Equipe Remota",
        description:
          "Sua liderada, Clara, parece desmotivada e distante.\n\nEla não tem entregado prazos e evita reuniões.\nO que você faz?",
        options: [
          { id: "a", text: "Cobrar prazos de forma firme." },
          { id: "b", text: "Ignorar e esperar que melhore." },
          { id: "c", text: "Agendar conversa franca, ouvir e oferecer apoio." },
        ],
        correctId: "c",
        feedbackWrong:
          "Pense em como você gostaria de ser tratado nesta situação. A empatia começa com compreensão.",
        feedbackCorrect:
          "Excelente! Abordar com empatia e oferecer apoio cria um ambiente de confiança.",
      },
    ],
  },
];
