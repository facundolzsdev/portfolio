package com.flzs.contact.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactFormDTO {

    private String fullName;
    private String phone;
    private String subject;
    private String message;
    private String email;

}