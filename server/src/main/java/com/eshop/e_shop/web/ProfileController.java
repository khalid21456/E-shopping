package com.eshop.e_shop.web;

import com.eshop.e_shop.domain.DTO.ProfileData;
import com.eshop.e_shop.services.ProfileService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@SuppressWarnings("unused")

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/data")
    public ResponseEntity<?> getProfileData(@PathVariable UUID id) {
        ProfileData profileData = profileService.getProfileData(id);
        if(profileData == null) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Utilisateur non trouvé !"));
        }
        return ResponseEntity.ok()
                .body(profileData);

    }

}
