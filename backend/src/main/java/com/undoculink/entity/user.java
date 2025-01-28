package com.undoculink.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "users") // Maps to the "users" table in the database
public class User {

    @Id
    @Column(name = "id", nullable = false, unique = true, length = 36)
    private String id; // Maps to the "id" column in the database

    @Column(name = "username", nullable = false, unique = true, length = 20)
    private String username; // Maps to the "username" column

    @Column(name = "public_key", nullable = false, length = 64)
    private String publicKey; // Maps to the "public_key" column

    @Column(name = "hashed_pin", nullable = false, length = 256)
    private String hashedPin; // Maps to the "hashed_pin" column

    @Column(name = "seed_phrase_hash", nullable = false, length = 256)
    private String seedPhraseHash; // Maps to the "seed_phrase_hash" column

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt; // Maps to the "created_at" column

    // Default constructor (required by JPA)
    public User() {}

    // Parameterized constructor
    public User(String id, String username, String publicKey, String hashedPin, String seedPhraseHash, LocalDateTime createdAt) {
        this.id = id;
        this.username = username;
        this.publicKey = publicKey;
        this.hashedPin = hashedPin;
        this.seedPhraseHash = seedPhraseHash;
        this.createdAt = createdAt;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(String publicKey) {
        this.publicKey = publicKey;
    }

    public String getHashedPin() {
        return hashedPin;
    }

    public void setHashedPin(String hashedPin) {
        this.hashedPin = hashedPin;
    }

    public String getSeedPhraseHash() {
        return seedPhraseHash;
    }

    public void setSeedPhraseHash(String seedPhraseHash) {
        this.seedPhraseHash = seedPhraseHash;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now(); // Automatically set the "created_at" field
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", publicKey='" + publicKey + '\'' +
                ", hashedPin='" + hashedPin + '\'' +
                ", seedPhraseHash='" + seedPhraseHash + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
