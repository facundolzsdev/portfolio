package com.flzs.contact.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class ResendEmailService {

    @Value("${resend.api.key}")
    private String resendApiKey;

    @Value("${contact.receiver.email}")
    private String receiverEmail;

    @Value("${contact.subject.prefix}")
    private String subjectPrefix;

    public void sendContactEmail(String fromName, String fromEmail, String message, String phone) {
        RestTemplate restTemplate = new RestTemplate();

        String subject = subjectPrefix + " - " + fromName;
        String content = String.format(
                "Nombre: %s\nEmail: %s\nTeléfono: %s\n\nMensaje:\n%s",
                fromName, fromEmail, phone, message
        );

        Map<String, Object> emailRequest = new HashMap<>();
        emailRequest.put("from", "Portfolio <onboarding@resend.dev>");
        emailRequest.put("to", receiverEmail);
        emailRequest.put("subject", subject);
        emailRequest.put("text", content);
        emailRequest.put("reply_to", fromEmail);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + resendApiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(emailRequest, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    "https://api.resend.com/emails",
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Failed to send email: " + response.getBody());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error sending email via Resend: " + e.getMessage(), e);
        }
    }
}