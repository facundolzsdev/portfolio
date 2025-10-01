package com.flzs.contact.controller;

import com.flzs.contact.dto.ContactFormDTO;
import com.flzs.contact.service.ResendEmailService;
import com.flzs.contact.util.ContactFormSanitizer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

@RestController
@RequestMapping("/api/contact")
@Slf4j
public class ContactController {

    private final ResendEmailService emailService;

    @Autowired
    private MessageSource messageSource;

    public ContactController(ResendEmailService emailService) {
        this.emailService = emailService;
    }

    private String getContactMessage(String code) {
        return messageSource.getMessage("contact." + code, null, Locale.getDefault());
    }

    @PostMapping
    public ResponseEntity<String> sendContactMessage(@RequestBody ContactFormDTO form) {
        try {
            ContactFormSanitizer.sanitize(form);

            emailService.sendContactEmail(
                    form.getFullName(),
                    form.getEmail(),
                    form.getMessage(),
                    form.getPhone());

            log.info("Contact message sent successfully from: {}", form.getEmail());
            return ResponseEntity.ok(getContactMessage("success"));

        } catch (Exception e) {
            log.error("Error sending contact message: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(getContactMessage("unexpectedError"));
        }
    }
}