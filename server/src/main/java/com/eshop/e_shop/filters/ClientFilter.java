package com.eshop.e_shop.filters;

import com.eshop.e_shop.domain.models.Client;
import com.eshop.e_shop.repositories.ClientRepo;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.oauth2.jwt.Jwt;

import java.io.IOException;
import java.util.UUID;

@SuppressWarnings("unused")
@RequiredArgsConstructor
@Component
public class ClientFilter extends OncePerRequestFilter {

    private final ClientRepo clientRepo;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof Jwt jwt) {
            UUID keycloakId = UUID.fromString(jwt.getSubject());
            if (!clientRepo.existsById(keycloakId)) {
                Client client = Client.builder()
                        .id(keycloakId)
                        .name(jwt.getClaimAsString("preferred_name"))
                        .email(jwt.getClaimAsString("preferred_email"))
                        .password(jwt.getClaimAsString("preferred_password"))
                        .build();
                clientRepo.save(client);
            }
        }
        filterChain.doFilter(request,response);
    }
}
