package com.undoculink.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    private String pin;
    private String seedPhrase;
}