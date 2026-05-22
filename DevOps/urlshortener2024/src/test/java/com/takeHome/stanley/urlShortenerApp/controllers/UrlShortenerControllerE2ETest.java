package com.takeHome.stanley.urlShortenerApp.controllers;

import com.takeHome.stanley.urlShortenerApp.models.ShortUrl;
import com.takeHome.stanley.urlShortenerApp.models.domains.ApiResponse;
import com.takeHome.stanley.urlShortenerApp.models.dtos.GenerateShortUrlDTO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)
public class UrlShortenerControllerE2ETest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void shouldCreateShortUrl() {
        // Arrange
        GenerateShortUrlDTO dto = new GenerateShortUrlDTO();
        dto.setCustomId("customId123");
        dto.setLongUrl("http://example.com");
        dto.setExpiryTime(LocalDateTime.now().plusDays(1));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<GenerateShortUrlDTO> request = new HttpEntity<>(dto, headers);

        // Act
        ResponseEntity<ApiResponse<ShortUrl>> response = restTemplate.exchange(
                createURLWithPort("/api/v1/urlShortener"),
                HttpMethod.POST,
                request,
                new ParameterizedTypeReference<ApiResponse<ShortUrl>>() {}
        );

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().getData().getCustomId()).isEqualTo("customId123");
        assertThat(response.getBody().getData().getLongUrl()).isEqualTo("http://example.com");
        assertThat(response.getBody().getMessage()).isEqualTo("Record saved successfully");
    }

    @Test
    public void shouldRedirectToLongUrl() {
        // Arrange
        String customId = "customId123";
        String longUrl = "http://example.com";

        // Act
        ResponseEntity<ApiResponse> response = restTemplate.getForEntity(createURLWithPort("/api/v1/urlShortener/" + customId), ApiResponse.class);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getData()).isEqualTo(longUrl);
        assertThat(response.getBody().getMessage()).isEqualTo("Record retrieved successfully");
    }

    @Test
    public void shouldDeleteShortUrl() {
        // Arrange
        String customId = "customId123";

        // Act
        ResponseEntity<ApiResponse> response = restTemplate.exchange(createURLWithPort("/api/v1/urlShortener/" + customId), HttpMethod.DELETE, null, ApiResponse.class);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getMessage()).isEqualTo("Record removed successfully");
    }

    @Test
    public void shouldReturn404WhenShortUrlNotFound() {
        // Arrange
        String customId = "nonExistentId";

        // Act
        ResponseEntity<ApiResponse> response = restTemplate.getForEntity(createURLWithPort("/api/v1/urlShortener/" + customId), ApiResponse.class);

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    private String createURLWithPort(String uri) {
        return "http://localhost:" + port + uri;
    }
}