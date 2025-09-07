package com.eshop.e_shop.domain.DTO;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}