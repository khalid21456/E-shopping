package com.eshop.e_shop.domain.DTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PendingUser {
    private String name;
    private String email;
    private String password;
    private String code;
}