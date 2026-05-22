package com.takeHome.stanley.urlShortenerApp.models.dtos;


import org.hibernate.validator.messageinterpolation.ParameterMessageInterpolator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class GenerateShortUrlDTOTest {

    private Validator validator;

    @BeforeEach
    public void setUp() {
        ValidatorFactory factory = Validation.byDefaultProvider()
                .configure()
                .messageInterpolator(new ParameterMessageInterpolator())
                .buildValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void shouldPassValidationWithValidUrl() {
        // Arrange
        GenerateShortUrlDTO dto = new GenerateShortUrlDTO();
        dto.setCustomId("customId123");
        dto.setLongUrl("https://example.com");

        // Act
        Set<ConstraintViolation<GenerateShortUrlDTO>> violations = validator.validate(dto);

        // Assert
        assertTrue(violations.isEmpty(), "DTO with valid URL should pass validation");
    }

    @Test
    void shouldFailValidationWithInvalidUrl() {
        // Arrange
        GenerateShortUrlDTO dto = new GenerateShortUrlDTO();
        dto.setCustomId("customId123");
        dto.setLongUrl("invalid-url");

        // Act
        Set<ConstraintViolation<GenerateShortUrlDTO>> violations = validator.validate(dto);

        // Assert
        assertFalse(violations.isEmpty(), "DTO with invalid URL should fail validation");
        assertEquals(1, violations.size(), "There should be 1 violation for invalid URL");
        ConstraintViolation<GenerateShortUrlDTO> violation = violations.iterator().next();
        assertEquals("longUrl", violation.getPropertyPath().toString(), "Invalid field should be longUrl");
        assertEquals("must be a valid URL", violation.getMessage(), "Invalid URL should trigger 'must be a valid URL' message");
    }

    @Test
    void shouldFailValidationWhenUrlIsNull() {
        // Arrange
        GenerateShortUrlDTO dto = new GenerateShortUrlDTO();
        dto.setCustomId("customId123");
        dto.setLongUrl(null); // Null longUrl

        // Act
        Set<ConstraintViolation<GenerateShortUrlDTO>> violations = validator.validate(dto);

        // Assert
        assertFalse(violations.isEmpty(), "DTO with null URL should fail validation");
        assertEquals(1, violations.size(), "There should be 1 violation for null URL");
        ConstraintViolation<GenerateShortUrlDTO> violation = violations.iterator().next();
        assertEquals("longUrl", violation.getPropertyPath().toString(), "Null field should be longUrl");
        assertEquals("must not be empty", violation.getMessage(), "Null URL should trigger 'must not be null' message");
    }

    @Test
    void shouldFailValidationWithEmptyUrl() {
        // Arrange
        GenerateShortUrlDTO dto = new GenerateShortUrlDTO();
        dto.setCustomId("customId123");
        dto.setLongUrl(""); // Empty longUrl

        // Act
        Set<ConstraintViolation<GenerateShortUrlDTO>> violations = validator.validate(dto);

        // Assert
        assertFalse(violations.isEmpty(), "DTO with empty URL should fail validation");
        assertEquals(1, violations.size(), "There should be 1 violation for empty URL");
        ConstraintViolation<GenerateShortUrlDTO> violation = violations.iterator().next();
        assertEquals("longUrl", violation.getPropertyPath().toString(), "Invalid field should be longUrl");
        assertEquals("must not be empty", violation.getMessage(), "Empty URL should trigger 'must be a valid URL' message");
    }

    @Test
    void shouldFailValidationWithUrlWithoutProtocol() {
        // Arrange
        GenerateShortUrlDTO dto = new GenerateShortUrlDTO();
        dto.setCustomId("customId123");
        dto.setLongUrl("www.example.com"); // Missing protocol

        // Act
        Set<ConstraintViolation<GenerateShortUrlDTO>> violations = validator.validate(dto);

        // Assert
        assertFalse(violations.isEmpty(), "DTO with URL missing protocol should fail validation");
        assertEquals(1, violations.size(), "There should be 1 violation for missing protocol");
        ConstraintViolation<GenerateShortUrlDTO> violation = violations.iterator().next();
        assertEquals("longUrl", violation.getPropertyPath().toString(), "Invalid field should be longUrl");
        assertEquals("must be a valid URL", violation.getMessage(), "URL without protocol should trigger 'must be a valid URL' message");
    }

}