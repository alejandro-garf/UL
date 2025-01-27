package com.undoculink.controller;

import com.undoculink.service.UserService;
import com.undoculink.dto.SignupRequest;
import com.undoculink.dto.LoginRequest;
import com.undoculink.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try {
            // Hash the PIN and seed phrase (we'll add proper hashing later)
            String hashedPin = request.getPin(); // Temporary - don't store plain PIN
            String seedPhraseHash = request.getSeedPhrase(); // Temporary

            // Create the user
            User user = userService.createUser(
                request.getUsername(),
                "generated-public-key", // We'll generate this properly later
                hashedPin,
                seedPhraseHash
            );

            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("username", user.getUsername());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = userService.findByUsername(request.getUsername());
            
            // Temporary simple PIN check - we'll add proper verification later
            if (request.getPin().equals(user.getHashedPin())) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Login successful");
                response.put("username", user.getUsername());
                return ResponseEntity.ok(response);
            } else {
                throw new RuntimeException("Invalid credentials");
            }
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}