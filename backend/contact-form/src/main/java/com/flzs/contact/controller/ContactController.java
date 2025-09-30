package com.flzs.contact.controller;

import com.flzs.contact.dto.ContactFormDTO;
import com.flzs.contact.util.ContactFormSanitizer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

@RestController
@RequestMapping("/api/contact")
@Slf4j
public class ContactController {

    @Value("${contact.receiver.email}")
    private String contactReceiverEmail;

    @Value("${contact.subject.prefix}")
    private String contactSubjectPrefix;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private MessageSource messageSource;

    private String getContactMessage(String code) {
        return messageSource.getMessage("contact." + code, null, Locale.getDefault());
    }

    /**
     * Processes the submission of messages from the contact form.
     *
     * @param form Contact form data (name, email, phone, subject, message)
     * @return ResponseEntity with success or error message
     * @apiNote Automatically sanitizes all fields before processing
     * @apiNote Possible Responses:
     * - 200 OK: Message sent successfully
     * - 500 Internal Server Error: Error during submission (authentication, service, etc.)
     */
    @PostMapping
    public ResponseEntity<String> sendContactMessage(@RequestBody ContactFormDTO form) {
        try {
            ContactFormSanitizer.sanitize(form);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(contactReceiverEmail);
            message.setSubject(contactSubjectPrefix + form.getSubject());
            message.setText(buildEmailContent(form));

            mailSender.send(message);
            log.info("Contact message sent successfully from: {}", form.getEmail());

            return ResponseEntity.ok(getContactMessage("success"));
        } catch (MailAuthenticationException e) {
            log.error("Email authentication failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(getContactMessage("authError"));
        } catch (MailSendException e) {
            log.error("Failed to send email: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(getContactMessage("sendError"));
        } catch (MailException e) {
            log.error("Mail service error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(getContactMessage("serviceError"));
        } catch (Exception e) {
            log.error("Unexpected error sending contact message: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(getContactMessage("unexpectedError"));
        }
    }

    private String buildEmailContent(ContactFormDTO form) {
        return String.format(
                "Nombre: %s%nEmail: %s%nTeléfono: %s%n%n%s",
                form.getFullName(),
                form.getEmail(),
                form.getPhone(),
                form.getMessage()
        );
    }
}