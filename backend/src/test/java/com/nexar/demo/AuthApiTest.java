package com.nexar.demo;

import org.junit.jupiter.api.Test;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;
import static org.hamcrest.MatcherAssert.assertThat;

public class AuthApiTest {

    @Test
    void deveRealizarLoginComSucesso() throws Exception {
        String body = "{\"email\":\"admin@nexar.com\",\"password\":\"123456\"}";

        HttpURLConnection conn = connect("POST", "http://localhost:8080/api/auth/login");
        send(conn, body);

        int status = conn.getResponseCode();
        String response = read(conn);

        // 1. Validação de status code
        assertEquals(200, status);

        // 2. Validação do corpo
        assertTrue(response.contains("\"token\""), "Resposta deve conter token");

        // 3. Validação de contrato utilizando JSON Schema (Exigência da atividade!)
        assertThat(response, matchesJsonSchemaInClasspath("schema/login-success-schema.json"));
    }

    @Test
    void deveRetornar401ParaCredenciaisInvalidas() throws Exception {
        String body = "{\"email\":\"admin@nexar.com\",\"password\":\"senhaErrada\"}";

        HttpURLConnection conn = connect("POST", "http://localhost:8080/api/auth/login");
        send(conn, body);

        int status = conn.getResponseCode();
        String response = readError(conn);

        assertEquals(401, status);
        assertTrue(response.contains("Credenciais inválidas"), "Deve retornar mensagem de erro");
    }

    @Test
    void deveValidarHealthCheck() throws Exception {
        HttpURLConnection conn = connect("GET", "http://localhost:8080/api/health");

        int status = conn.getResponseCode();
        String response = read(conn);

        assertEquals(200, status);
        assertTrue(response.contains("NEXAR API is running"), "API deve estar rodando");
    }

    // ─── Helpers ────────────────────────────────────────────────────────────

    private HttpURLConnection connect(String method, String urlStr) throws Exception {
        HttpURLConnection conn = (HttpURLConnection) new URL(urlStr).openConnection();
        conn.setRequestMethod(method);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);
        return conn;
    }

    private void send(HttpURLConnection conn, String body) throws Exception {
        try (OutputStream os = conn.getOutputStream()) {
            os.write(body.getBytes());
        }
    }

    private String read(HttpURLConnection conn) throws Exception {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
            return br.lines().collect(Collectors.joining());
        }
    }

    private String readError(HttpURLConnection conn) throws Exception {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getErrorStream()))) {
            return br.lines().collect(Collectors.joining());
        }
    }
}