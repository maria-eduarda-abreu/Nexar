package com.nexar.demo;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

public class LoginSteps {

    private int statusCode;
    private String responseBody;
    private String requestBody;

    @Given("que o usuário possui email e senha válidos")
    public void usuarioValido() {
        requestBody = "{\"email\":\"admin@nexar.com\",\"password\":\"123456\"}";
    }

    @When("enviar uma requisição POST para login")
    public void enviarLogin() throws Exception {
        HttpURLConnection conn = connect("POST", "http://localhost:8080/api/auth/login");
        send(conn, requestBody);
        statusCode = conn.getResponseCode();
        responseBody = read(conn);
    }

    @Then("o sistema deve retornar status 200")
    public void validarStatus200() {
        assertEquals(200, statusCode);
    }

    @And("deve retornar um token JWT")
    public void validarToken() {
        assertTrue("Resposta deve conter token", responseBody.contains("\"token\""));
    }

    @And("o corpo da resposta deve estar de acordo com o schema de sucesso")
    public void validarSchema() throws Exception {
        // Valida que os campos obrigatórios do schema estão presentes
        assertTrue("Resposta deve conter campo token", responseBody.contains("\"token\""));
        assertTrue("Resposta deve conter campo message", responseBody.contains("\"message\""));
    }

    @Given("que o usuário possui credenciais inválidas")
    public void usuarioInvalido() {
        requestBody = "{\"email\":\"admin@nexar.com\",\"password\":\"senhaerrada\"}";
    }

    @When("enviar uma requisição POST para login inválido")
    public void enviarLoginInvalido() throws Exception {
        HttpURLConnection conn = connect("POST", "http://localhost:8080/api/auth/login");
        send(conn, requestBody);
        statusCode = conn.getResponseCode();
        responseBody = readError(conn);
    }

    @Then("o sistema deve retornar status 401")
    public void validarStatus401() {
        assertEquals(401, statusCode);
    }

    @And("deve retornar mensagem de erro")
    public void validarMensagemErro() {
        assertTrue("Deve conter mensagem de erro", responseBody.contains("Credenciais inválidas"));
    }

    @Given("que o usuário não informa email e senha")
    public void loginSemDados() {
        requestBody = "{}";
    }

    @When("enviar requisição sem dados")
    public void enviarSemDados() throws Exception {
        HttpURLConnection conn = connect("POST", "http://localhost:8080/api/auth/login");
        send(conn, requestBody);
        statusCode = conn.getResponseCode();
        responseBody = readError(conn);
    }

    @Then("o sistema deve retornar status 400")
    public void validarStatus400() {
        assertEquals(400, statusCode);
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