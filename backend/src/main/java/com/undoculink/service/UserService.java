package com.undoculink.service;

import com.undoculink.entity.User;
import com.undoculink.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User createUser(String username, String publicKey, String hashedPin, String seedPhraseHash) {
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setUsername(username);
        user.setPublicKey(publicKey);
        user.setHashedPin(hashedPin);
        user.setSeedPhraseHash(seedPhraseHash);
        
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
}