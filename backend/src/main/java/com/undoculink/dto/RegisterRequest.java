package com.undoculink.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String pin;
    private String seedPhrase;
    private String publicKey;
}