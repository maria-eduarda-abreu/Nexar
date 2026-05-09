package com.nexar.demo;

import org.junit.jupiter.api.Test;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AuthApiTest {

    @Test
    void deveRealizarLoginComSucesso() throws Exception {

        URL url = new URL("http://localhost:8080/api/auth/login");

        HttpURLConnection connection =
                (HttpURLConnection) url.openConnection();

        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);

        String json =
                """
                {
                    "email":"admin@nexar.com",
                    "password":"123456"
                }
                """;

        try (OutputStream os = connection.getOutputStream()) {
            os.write(json.getBytes());
        }

        int status = connection.getResponseCode();

        assertEquals(200, status);
    }

    @Test
    void deveRetornar401ParaCredenciaisInvalidas() throws Exception {

        URL url = new URL("http://localhost:8080/api/auth/login");

        HttpURLConnection connection =
                (HttpURLConnection) url.openConnection();

        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);

        String json =
                """
                {
                    "email":"admin@nexar.com",
                    "password":"senhaErrada"
                }
                """;

        try (OutputStream os = connection.getOutputStream()) {
            os.write(json.getBytes());
        }

        int status = connection.getResponseCode();

        assertEquals(401, status);
    }

    @Test
    void deveValidarHealthCheck() throws Exception {

        URL url = new URL("http://localhost:8080/api/health");

        HttpURLConnection connection =
                (HttpURLConnection) url.openConnection();

        connection.setRequestMethod("GET");

        int status = connection.getResponseCode();

        assertEquals(200, status);
    }
}