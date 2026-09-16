package com.campus.organizerservice.service;

import com.campus.organizerservice.dto.AuthResponse;
import com.campus.organizerservice.dto.LoginRequest;
import com.campus.organizerservice.dto.RegisterRequest;
import com.campus.organizerservice.entity.Role;
import com.campus.organizerservice.entity.User;
import com.campus.organizerservice.repository.UserRepository;
import com.campus.organizerservice.security.JwtService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public void register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.ORGANIZER)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.password(),
                user.getPassword()
        )) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getId());

        return new AuthResponse(
                token,
                user.getId(),
                user.getName(),
                user.getRole().name()
        );
    }
}