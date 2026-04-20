# ETAPA 1: Build do Frontend (React)
FROM node:20 AS frontend-build
WORKDIR /nexar-website/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# ETAPA 2: Build do Backend (Java Spring Boot)
FROM eclipse-temurin:21-jdk AS backend-build
WORKDIR /nexar-website/backend
COPY backend/gradlew ./
COPY backend/gradle ./gradle
COPY backend/build.gradle ./
COPY backend/settings.gradle ./
COPY backend/src ./src
RUN chmod +x gradlew && ./gradlew clean build -x test

# ETAPA 3: Imagem Final (Execução)
FROM eclipse-temurin:21-jre
WORKDIR /nexar-website

# Copia o jar do backend
COPY --from=backend-build /nexar-website/backend/build/libs/*.jar app.jar

# Copia os arquivos estáticos do frontend para o backend servir (opcional)
# Ou você pode rodar o frontend separadamente no docker-compose
COPY --from=frontend-build /nexar-website/frontend/dist ./public

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]