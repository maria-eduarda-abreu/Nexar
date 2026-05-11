# Documentação Técnica: NEXAR

> Plataforma de empregabilidade sustentável com Inteligência Artificial

---

## 📝 Descrição

O **NEXAR** é uma plataforma de empregabilidade sustentável que utiliza Inteligência Artificial para conectar talentos ao seu propósito, focando em habilidades humanas e carreiras emergentes para reduzir o impacto social da automação.

---

## 💻 Tecnologias Utilizadas

| Categoria | Tecnologias |
| :--- | :--- |
| **Backend** | Java 21 com Spring Boot (Spring Web, Data MongoDB) |
| **Frontend** | React.js com Vite e CSS Modules |
| **Banco de Dados** | MongoDB (NoSQL) - coleções de usuários, carreiras e mentores |
| **DevOps** | Docker, Docker Compose e GitHub Actions |
| **Testes (Novo)** | JUnit 5 / JUnit 4, Cucumber (BDD / Gherkin), Rest-Assured (JSON Schema), Gradle |

---

## ⚙️ Como Configurar e Executar Localmente

### Pré-requisitos
Para rodar o projeto localmente, você precisa ter instalados em sua máquina:
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- JDK 21 *(Opcional, pois o Gradle Wrapper resolve as dependências locais)*

### Passo a Passo de Execução do Projeto e Para Rodar os testes automatizados

**1. Subir a infraestrutura (Banco de Dados, API e Frontend)**
Certifique-se de que o **Docker Desktop** esteja em execução. Na raiz do projeto (onde está o arquivo `docker-compose.yml`), abra o terminal e execute:

```bash
docker-compose up -d --build

cd backend

./gradlew test
