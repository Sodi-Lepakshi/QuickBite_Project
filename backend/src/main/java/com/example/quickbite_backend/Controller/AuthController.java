package com.example.quickbite_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final Map<String, String> users = new HashMap<>();

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Map<String, String> user) {
        System.out.println("Received user: " + user); // Debug log

        String email = user.get("email");
        String password = user.get("password");
        String name = user.get("name");

        if (email == null || password == null || name == null) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }

        if (users.containsKey(email)) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        users.put(email, password);
        return ResponseEntity.ok("Signup successful");
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing credentials"));
        }

        if (users.containsKey(email) && users.get(email).equals(password)) {
            return ResponseEntity.ok(Map.of("token", "jwt-" + email, "name", email.split("@")[0]));
        }

        return ResponseEntity.badRequest().body(Map.of("error", "Invalid credentials"));
    }
}