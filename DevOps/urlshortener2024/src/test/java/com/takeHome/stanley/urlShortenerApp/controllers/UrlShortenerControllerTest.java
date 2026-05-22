package com.takeHome.stanley.urlShortenerApp.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.takeHome.stanley.urlShortenerApp.exceptions.ResourceNotFoundException;
import com.takeHome.stanley.urlShortenerApp.models.ShortUrl;
import com.takeHome.stanley.urlShortenerApp.models.dtos.GenerateShortUrlDTO;
import com.takeHome.stanley.urlShortenerApp.services.IShortUrlService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.MessageSource;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@WebMvcTest(UrlShortenerController.class)
class UrlShortenerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IShortUrlService shortUrlService;

    @Mock
    private MessageSource messageSource;

    private ObjectMapper objectMapper;
    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        mockMvc = MockMvcBuilders.standaloneSetup(new UrlShortenerController(shortUrlService, messageSource)).build();
    }
    @Test
    void shouldCreateShortUrl() throws Exception {
        // Arrange
        GenerateShortUrlDTO dto = new GenerateShortUrlDTO();
        dto.setCustomId("customId123");
        dto.setLongUrl("http://example.com");

        ShortUrl shortUrl = new ShortUrl();
        shortUrl.setCustomId("customId123");
        shortUrl.setLongUrl("http://example.com");

        when(shortUrlService.generateShortUrl(any(GenerateShortUrlDTO.class))).thenReturn(shortUrl);
        when(messageSource.getMessage(anyString(), any(), any())).thenReturn("Short URL created successfully");

        // Act and Assert
        mockMvc.perform(post("/api/v1/urlShortener")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.customId").value("customId123"))
                .andExpect(jsonPath("$.data.longUrl").value("http://example.com"))
                .andExpect(jsonPath("$.message").value("Short URL created successfully"));
    }
    @Test
    void shouldRedirectToLongUrl() throws Exception {
        // Arrange
        String customId = "customId123";
        String longUrl = "http://example.com";

        when(shortUrlService.getLongUrl(customId)).thenReturn(longUrl);
        when(messageSource.getMessage(anyString(), any(), any())).thenReturn("Fetched long URL successfully");

        // Act and Assert
        mockMvc.perform(get("/api/v1/urlShortener/{id}", customId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value(longUrl))
                .andExpect(jsonPath("$.message").value("Fetched long URL successfully"));
    }
    @Test
    void shouldDeleteShortUrl() throws Exception {
        // Arrange
        String customId = "customId123";
        when(messageSource.getMessage(anyString(), any(), any())).thenReturn("Short URL deleted successfully");

        // Act and Assert
        mockMvc.perform(delete("/api/v1/urlShortener/{id}", customId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Short URL deleted successfully"));
    }
    @Test
    void shouldReturn404WhenShortUrlNotFound() throws Exception {
        // Arrange
        String customId = "nonExistentId";
        when(shortUrlService.getLongUrl(customId)).thenThrow(new ResourceNotFoundException("ShortUrl", "customId", customId));
        when(messageSource.getMessage(anyString(), any(), any())).thenReturn("ShortUrl with customId 'nonExistentId' is not found");

        // Act and Assert
        mockMvc.perform(get("/api/v1/urlShortener/{id}", customId))
                .andExpect(status().isNotFound());
    }

}