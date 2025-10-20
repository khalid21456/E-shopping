package com.eshop.e_shop.services;


import com.eshop.e_shop.domain.DTO.ProfileData;
import com.eshop.e_shop.domain.models.Client;
import com.eshop.e_shop.repositories.ClientRepo;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@SuppressWarnings("unused")

@Service
public class ProfileService {

    private final ClientRepo clientRepo;

    public ProfileService(ClientRepo clientRepo) {
        this.clientRepo = clientRepo;
    }

    public ProfileData getProfileData(UUID id) {
        Optional<Client> optionalClient = clientRepo.findById(id);
        if(optionalClient.isEmpty()) {
            return null;
        }
        Client client = optionalClient.get();
        ProfileData profileData = ProfileData.builder()
                .name(client.getName())
                .id(client.getId())
                .email(client.getEmail())
                .build();

        return profileData;
    }

}
