package com.example.Shop.service;

import java.util.HashMap;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class AuthService {
	private HashMap<String, String> tokenStorage = new HashMap<>(); 

    public String generateToken(String username) {
        String token = UUID.randomUUID().toString(); 
        tokenStorage.put(token, username); 
        return token;
    }

    public String validateTokenAndGetUser(String token) {
        return tokenStorage.get(token); 
    }
}
