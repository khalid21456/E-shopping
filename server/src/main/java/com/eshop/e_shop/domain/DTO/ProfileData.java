package com.eshop.e_shop.domain.DTO;


import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data @Builder
public class ProfileData {

    private UUID id;
    private String name;
    private String email;
}
