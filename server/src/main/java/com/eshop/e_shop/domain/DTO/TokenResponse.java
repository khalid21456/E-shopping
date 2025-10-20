package com.eshop.e_shop.domain.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data @AllArgsConstructor
public class TokenResponse {

    private boolean valid;
    private String message;
    private String username;
}
