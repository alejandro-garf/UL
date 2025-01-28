package com.undoculink.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
public class RegisterRequest {

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
    private String username;

    @NotBlank(message = "PIN is required")
    @Size(min = 4, max = 4, message = "PIN must be exactly 4 digits")
    private String pin;

    @NotBlank(message = "Seed phrase is required")
    private String seedPhrase;

    @NotBlank(message = "Public key is required")
    private String publicKey;

    // Explicit getters and setters if Lombok is not working:
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public String getSeedPhrase() {
        return seedPhrase;
    }

    public void setSeedPhrase(String seedPhrase) {
        this.seedPhrase = seedPhrase;
    }

    public String getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(String publicKey) {
        this.publicKey = publicKey;
    }
}
