package com.undoculink.controller;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.undoculink.config.RateLimitConfig;
import com.undoculink.dto.LoginRequest;
import com.undoculink.dto.RegisterRequest;
import com.undoculink.entity.User;
import com.undoculink.service.AuthService;
import com.undoculink.service.AuthService.AuthResponse;

import io.github.bucket4j.Bucket;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private AuthService authService;

    @Autowired
    private RateLimitConfig rateLimitConfig;

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    private Bucket resolveBucket(String key) {
        return buckets.computeIfAbsent(key, k -> rateLimitConfig.createNewBucket());
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {
        // Rate limiting
        Bucket bucket = resolveBucket(request.getUsername());
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(429).body("Too many requests. Please try again later.");
        }

        try {
            User user = authService.registerUser(request);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest request) {
        // Rate limiting
        Bucket bucket = resolveBucket(request.getUsername());
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(429).body("Too many requests. Please try again later.");
        }

        try {
            AuthResponse response = authService.loginUser(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestHeader("Refresh-Token") String refreshToken) {
        try {
            AuthResponse response = authService.refreshToken(refreshToken);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Protected endpoint example
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String token) {
        // Rate limiting
        String username = authService.getUsernameFromToken(token.replace("Bearer ", ""));
        Bucket bucket = resolveBucket(username);
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(429).body("Too many requests. Please try again later.");
        }

        try {
            // Get user profile logic here
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}