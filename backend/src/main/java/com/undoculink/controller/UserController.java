package com.undoculink.controller;

import com.undoculink.entity.User;
import com.undoculink.dto.LoginRequest;
import com.undoculink.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // Your frontend URL
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            // Check if username exists
            if (userService.usernameExists(user.getUsername())) {
                return ResponseEntity.badRequest().body("Username already exists");
            }
            
            // TODO: Add PIN hashing
            // TODO: Add seed phrase hashing
            
            User savedUser = userService.createUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating user: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        // TODO: Implement login logic
        return ResponseEntity.ok().build();
    }
}