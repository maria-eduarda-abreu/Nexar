package com.nexar.demo;

import io.cucumber.java.Before;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.RestAssured;
import io.restassured.response.Response;

import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

public class LoginSteps {

    private Response response;
    private Map<String, String> requestBody;

    @Before
    public void setup() {
        RestAssured.baseURI = "http://localhost:8080";
    }

    @Given("que o usuário possui email e senha válidos")
    public void usuarioValido() {
        requestBody = new HashMap<>();
        requestBody.put("email", "admin@nexar.com");
        requestBody.put("password", "123456");
    }

    @When("enviar uma requisição POST para login")
    public void enviarLogin() {
        response = RestAssured
                .given()
                .contentType("application/json")
                .body(requestBody)
                .when()
                .post("/api/auth/login");
    }

    @Then("o sistema deve retornar status 200")
    public void validarStatus200() {
        assertThat(response.getStatusCode(), is(200));
    }

    @And("deve retornar um token JWT")
    public void validarToken() {
        assertThat(response.jsonPath().getString("token"), notNullValue());
    }

    @Given("que o usuário possui credenciais inválidas")
    public void usuarioInvalido() {
        requestBody = new HashMap<>();
        requestBody.put("email", "admin@nexar.com");
        requestBody.put("password", "senhaerrada");
    }

    @When("enviar uma requisição POST para login inválido")
    public void enviarLoginInvalido() {
        response = RestAssured
                .given()
                .contentType("application/json")
                .body(requestBody)
                .when()
                .post("/api/auth/login");
    }

    @Then("o sistema deve retornar status 401")
    public void validarStatus401() {
        assertThat(response.getStatusCode(), is(401));
    }

    @And("deve retornar mensagem de erro")
    public void validarMensagemErro() {
        assertThat(response.jsonPath().getString("message"),
                equalTo("Credenciais inválidas"));
    }

    @Given("que o usuário não informa email e senha")
    public void loginSemDados() {
        requestBody = new HashMap<>();
    }

    @When("enviar requisição sem dados")
    public void enviarSemDados() {
        response = RestAssured
                .given()
                .contentType("application/json")
                .body(requestBody)
                .when()
                .post("/api/auth/login");
    }

    @Then("o sistema deve retornar status 400")
    public void validarStatus400() {
        assertThat(response.getStatusCode(), is(400));
    }
}