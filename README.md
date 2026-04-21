# NEXAR - Seu Copiloto para a Carreira do Futuro 🚀

O **NEXAR** é uma plataforma inovadora desenhada para guiar profissionais e estudantes através das transformações do mercado de trabalho. Utilizando Inteligência Artificial e conceitos de gamificação, o projeto foca no desenvolvimento de "Human Skills" e na conexão com mentores, preparando o usuário para carreiras emergentes com foco em impacto social.

Este projeto foi desenvolvido como parte de um desafio prático de **DevOps**, integrando uma stack moderna com automação completa do ciclo de vida da aplicação.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
* **React.js** com **Vite** para um ambiente de desenvolvimento rápido.
* **CSS Modules** para estilização isolada e organizada.

### Backend
* **Java 21** com **Spring Boot**.
* **Spring Data MongoDB** para persistência de dados NoSQL.

### Infraestrutura e DevOps
* **Docker & Docker Compose**: Para containerização e orquestração de serviços.
* **GitHub Actions**: Esteira de CI/CD para automação de builds e testes.
* **MongoDB**: Banco de dados orientado a documentos.

---

## 📦 Containerização e Orquestração

A aplicação está totalmente containerizada, permitindo que o ambiente de desenvolvimento seja idêntico ao de produção.

* **Dockerfile**: Utiliza *Multi-Stage Build* para compilar o Frontend (Node.js) e o Backend (Maven/JDK), gerando uma imagem final otimizada baseada em JRE.
* **Docker Compose**: Orquestra a comunicação entre o serviço da aplicação (`nexar-app`) e o banco de dados (`mongodb`), utilizando redes isoladas e volumes para persistência de dados.

### Como executar localmente:
```bash
# Clone o repositório
git clone [https://github.com/seu-usuario/nexar.git](https://github.com/seu-usuario/nexar.git)

# Entre na pasta raiz
cd nexar

# Suba os containers
docker-compose up --build