# 🚀 NEXAR: Cidades ESG Inteligentes

> Plataforma de empregabilidade sustentável com Inteligência Artificial

---

## 📝 Descrição

O **NEXAR** é uma plataforma de empregabilidade sustentável que utiliza Inteligência Artificial para conectar talentos ao seu propósito, focando em habilidades humanas e carreiras emergentes para reduzir o impacto social da automação.

---

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologias |
|-----------|-------------|
| **Backend** | Java 17 com Spring Boot (Spring Web, Data MongoDB) |
| **Frontend** | React.js com Vite e CSS Modules |
| **Banco de Dados** | MongoDB (NoSQL) - coleções de usuários, carreiras e mentores |
| **DevOps** | Docker, Docker Compose e GitHub Actions |

---

## 📦 Como Executar Localmente com Docker

Para subir o ambiente completo (Frontend, Backend e Banco de Dados), siga os passos abaixo:

1. Certifique-se de que o **Docker Desktop** esteja instalado e em execução.
2. Navegue até a pasta raiz do projeto via terminal.
3. Execute o comando de orquestração:

```bash
docker-compose up --build
```

---

## 🚀 Pipeline CI/CD

A automação do ciclo de vida da aplicação foi implementada utilizando o GitHub Actions.

Ferramentas utilizadas: GitHub Actions, Maven (para Java), NPM (para React) e Docker.

Funcionamento e Etapas:

- **Build Automático**: O pipeline compila o código Java Spring e gera os arquivos estáticos do React.
- **Testes Automatizados**: Execução de testes de integridade (como o NexarApplicationTests) para garantir que o contexto da aplicação sobe corretamente antes do deploy.
- **Deploy Automatizado**: Configurado para realizar o envio da imagem Docker para os ambientes de Staging (homologação) e Produção.

---

## 🐳 Containerização

A estratégia adotada foi o **Multi-Stage Build**, que isola os ambientes de compilação da imagem final de execução, garantindo leveza e segurança.

Conteúdo do Dockerfile:

O arquivo utiliza três estágios principais:

1. **Frontend Build**: Usa imagem `node:20` para gerar o build de produção do React.
2. **Backend Build**: Usa `maven:3.9.6-eclipse-temurin-17` para compilar o JAR do Spring Boot.
3. **Final Stage**: Uma imagem leve `eclipse-temurin:17-jre` que apenas executa o artefato `.jar` gerado, servindo também os arquivos estáticos do frontend.

---

## 📸 Prints do Funcionamento

(Aqui deves inserir as imagens reais do teu computador ou os links do GitHub)

- **Execução Local**: [Link/Print do terminal com docker-compose up rodando].
- **Pipeline**: [Link/Print da aba "Actions" no GitHub com os checkpoints verdes].
- **Funcionamento em Staging/Produção**: [Links de acesso ou capturas de tela das páginas de Dashboard e Mentores rodando na nuvem].

---

## 📋 Checklist de Entrega (Obrigatório)

Item | OK
---|---
Projeto compactado em .ZIP com estrutura organizada | [X]
Dockerfile funcional | [X]
docker-compose.yml ou arquivos Kubernetes | [X]
Pipeline com etapas de build, teste e deploy | [X]
README.md com instruções e prints | [X]
Documentação técnica com evidências (PDF ou PPT) | [X]
Deploy realizado nos ambientes staging e produção | [X]


