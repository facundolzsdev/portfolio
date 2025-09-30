package com.flzs.contact.util;

import com.flzs.contact.dto.ContactFormDTO;

public class ContactFormSanitizer {

    public static void sanitize(ContactFormDTO form) {
        form.setFullName(sanitizeText(form.getFullName()));
        form.setEmail(sanitizeEmail(form.getEmail()));
        form.setSubject(sanitizeText(form.getSubject()));
        form.setMessage(sanitizeMessage(form.getMessage()));
        form.setPhone(sanitizePhone(form.getPhone()));
    }

    private static String sanitizeText(String input) {
        if (input == null) return "";

        return input.trim()
                .replaceAll("\\s+", " ") // Multiple spaces → a single space
                .replaceAll("[\r\n]+", " ") // Newlines → space (for name/subject)
                .replaceAll("[\\p{Cntrl}&&[^\r\n\t]]", ""); // Remove control characters
    }

    private static String sanitizeMessage(String input) {
        if (input == null) return "";

        return input.trim()
                .replaceAll("\\s+", " ")
                .replaceAll("[\r\n]+", "\n") // Multiple newlines → a single one
                .replaceAll("[\\p{Cntrl}&&[^\r\n\t]]", ""); // Remove control characters except \r\n\t
    }

    private static String sanitizeEmail(String email) {
        if (email == null) return "";

        return email.trim()
                .toLowerCase()
                .replaceAll("\\s", ""); // Remove any space from the email
    }

    private static String sanitizePhone(String phone) {
        if (phone == null || phone.trim().isEmpty()) {
            return "No proporcionado";
        }

        // Keep only characters valid for phone numbers
        String cleanPhone = phone.trim()
                .replaceAll("[^+\\-()\\s\\d.]", "") // Allow +, -, (), spaces, digits, and dot
                .replaceAll("\\s+", " ")
                .trim();

        return cleanPhone.isEmpty() ? "No proporcionado" : cleanPhone;
    }
}