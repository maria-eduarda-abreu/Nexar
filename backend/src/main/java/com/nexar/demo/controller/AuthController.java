package com.nexar.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", "Email e senha são obrigatórios"
            ));
        }

        if (email.equals("admin@nexar.com") && password.equals("123456")) {

            Map<String, Object> response = new HashMap<>();
            response.put("token", "jwt-token-simulado");
            response.put("message", "Login realizado com sucesso");

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                "message", "Credenciais inválidas"
        ));
    }
}