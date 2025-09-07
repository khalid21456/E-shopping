package com.eshop.e_shop.repositories;

import com.eshop.e_shop.domain.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@SuppressWarnings("unused")

@Repository
public interface ClientRepo extends JpaRepository<Client, UUID> {
    Optional<Client> findByEmail(String email);
}
