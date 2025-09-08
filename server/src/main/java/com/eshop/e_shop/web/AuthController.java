package com.eshop.e_shop.web;

import com.eshop.e_shop.domain.DTO.LoginRequest;
import com.eshop.e_shop.domain.DTO.PendingUser;
import com.eshop.e_shop.domain.DTO.SignUpRequest;
import com.eshop.e_shop.domain.models.Client;
import com.eshop.e_shop.repositories.ClientRepo;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
    private final String jwtSecret;
    private final JavaMailSender javaMailSender;
    private final Map<String, PendingUser> pendingUsers = new HashMap<>();


    public AuthController(ClientRepo clientRepo, PasswordEncoder passwordEncoder, JavaMailSender mailSender) {
        this.clientRepo = clientRepo;
        this.passwordEncoder = passwordEncoder;
        Dotenv dotenv = Dotenv.load();
        this.javaMailSender = mailSender;
        this.jwtSecret = dotenv.get("SECRET_KEY");
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Client> optionalClient = clientRepo.findByEmail(request.getEmail());
        if (optionalClient.isEmpty()) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Utilisateur non trouvé !"));
        }
        Client client = optionalClient.get();
        if (!request.getPassword().equals(client.getPassword())) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Mot de passe incorrect !"));
        }
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

    private ResponseEntity<?> SignUp(@RequestBody SignUpRequest request) throws MessagingException {
        if (clientRepo.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(400)
                    .body(Map.of("message", "Email already registered"));
        }

        String code = String.valueOf(new Random().nextInt(9000) + 1000);

        pendingUsers.put(request.getEmail(),
                new PendingUser(
                        request.getName(),
                        request.getEmail(),
                        passwordEncoder.encode(request.getPassword()),
                        code
                ));
        sendVerificationEmail(request.getEmail(), code);

        return ResponseEntity.ok(Map.of("message", "Verification code sent to email"));
    }

    @PostMapping("/signup/verify")
    public ResponseEntity<?> verifyCode(@RequestParam String email, @RequestParam String code) {
        PendingUser pending = pendingUsers.get(email);

        if (pending == null || !pending.getCode().equals(code)) {
            return ResponseEntity.status(400).body(Map.of("message", "Invalid or expired code"));
        }

        // create user
        Client client = new Client();
        client.setName(pending.getName());
        client.setEmail(pending.getEmail());
        client.setPassword(pending.getPassword()); // already hashed
        clientRepo.save(client);

        // remove from pending list
        pendingUsers.remove(email);

        // generate JWT + cookie (like in login)
        String token = Jwts.builder()
                .setSubject(client.getId().toString())
                .claim("email", client.getEmail())
                .claim("name", client.getName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600_000))
                .signWith(SignatureAlgorithm.HS256, jwtSecret.getBytes())
                .compact();

        ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(3600)
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header("Set-Cookie", jwtCookie.toString())
                .body(Map.of("id", client.getId(), "name", client.getName(), "email", client.getEmail()));
    }

    private void sendVerificationEmail(String to, String code) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setSubject("E-Shop Signup Verification Code");
        helper.setText("Your verification code is: " + code, true);
        javaMailSender.send(message);
    }

}
