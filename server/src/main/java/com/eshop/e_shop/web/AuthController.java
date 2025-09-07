package com.eshop.e_shop.web;

import com.eshop.e_shop.domain.DTO.LoginRequest;
import com.eshop.e_shop.domain.models.Client;
import com.eshop.e_shop.repositories.ClientRepo;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@SuppressWarnings("unused")
@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final ClientRepo clientRepo;
    private final PasswordEncoder passwordEncoder;
    private final String jwtSecret; // same as in JwtConfig

    public AuthController(ClientRepo clientRepo, PasswordEncoder passwordEncoder) {
        this.clientRepo = clientRepo;
        this.passwordEncoder = passwordEncoder;
        Dotenv dotenv = Dotenv.load();
        this.jwtSecret = dotenv.get("SECRET_KEY");
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Client> optionalClient = clientRepo.findByEmail(request.getEmail());

        // 1️⃣ User not found
        if (optionalClient.isEmpty()) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "User not found"));
        }

        Client client = optionalClient.get();

        // 2️⃣ Wrong password
        if (!request.getPassword().equals(client.getPassword())) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Invalid credentials"));
        }

        // 3️⃣ Credentials correct → generate JWT
        String token = Jwts.builder()
                .setSubject(client.getId().toString())
                .claim("email", client.getEmail())
                .claim("name", client.getName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600_000)) // 1h
                .signWith(SignatureAlgorithm.HS256, jwtSecret.getBytes())
                .compact();

        ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)          // cannot be accessed by JS (secure)
                .secure(false)           // set true if using HTTPS
                .path("/")               // cookie is valid for all endpoints
                .maxAge(3600)            // 1 hour
                .sameSite("Lax")      // prevent CSRF (can be "Lax" or "None" if cross-site)
                .build();

        return ResponseEntity.ok()
                .header("Set-Cookie", jwtCookie.toString())
                .body(Map.of(
                        "id", client.getId(),
                        "name", client.getName(),
                        "email", client.getEmail()
                ));
    }

}
