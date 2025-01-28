package com.undoculink.service;

import com.undoculink.dto.LoginRequest;
import com.undoculink.dto.RegisterRequest;
import com.undoculink.entity.User;
import com.undoculink.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    // Response DTO
    @Data
    public static class AuthResponse {
        private String accessToken;
        private String refreshToken;
        private String username;

        public AuthResponse(String accessToken, String refreshToken, String username) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.username = username;
        }
    }

    public User registerUser(RegisterRequest request) throws NoSuchAlgorithmException {
        // Check if username exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // Create new user
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setUsername(request.getUsername());
        user.setHashedPin(hashPin(request.getPin()));
        user.setPublicKey(request.getPublicKey());
        user.setSeedPhraseHash(hashSeedPhrase(request.getSeedPhrase()));

        return userRepository.save(user);
    }

    public AuthResponse loginUser(LoginRequest request) throws NoSuchAlgorithmException {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getHashedPin().equals(hashPin(request.getPin()))) {
            throw new RuntimeException("Invalid PIN");
        }

        String accessToken = jwtService.generateAccessToken(user.getUsername());
        String refreshToken = jwtService.generateRefreshToken(user.getUsername());

        return new AuthResponse(accessToken, refreshToken, user.getUsername());
    }

    public AuthResponse refreshToken(String refreshToken) {
        String username = jwtService.getUsernameFromToken(refreshToken);
        if (username == null || !jwtService.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }

        String newAccessToken = jwtService.generateAccessToken(username);
        String newRefreshToken = jwtService.generateRefreshToken(username);

        return new AuthResponse(newAccessToken, newRefreshToken, username);
    }

    public String getUsernameFromToken(String token) {
        return jwtService.getUsernameFromToken(token); // Delegates to JwtService
    }

    private String hashPin(String pin) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(pin.getBytes());
        return bytesToHex(hash);
    }

    private String hashSeedPhrase(String seedPhrase) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(seedPhrase.getBytes());
        return bytesToHex(hash);
    }

    private String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
