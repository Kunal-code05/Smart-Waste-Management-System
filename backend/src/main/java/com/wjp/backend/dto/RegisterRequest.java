package com.wjp.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String role; // ADMIN, CITIZEN, STAFF
}
