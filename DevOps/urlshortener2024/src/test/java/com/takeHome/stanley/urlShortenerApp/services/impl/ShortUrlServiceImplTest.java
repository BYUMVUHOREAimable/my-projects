package com.takeHome.stanley.urlShortenerApp.services.impl;

import com.takeHome.stanley.urlShortenerApp.exceptions.DuplicateRecordException;
import com.takeHome.stanley.urlShortenerApp.exceptions.ResourceNotFoundException;
import com.takeHome.stanley.urlShortenerApp.models.ShortUrl;
import com.takeHome.stanley.urlShortenerApp.models.dtos.GenerateShortUrlDTO;
import com.takeHome.stanley.urlShortenerApp.repositories.IShortUrlRepository;
import com.takeHome.stanley.urlShortenerApp.utils.RandomStringGenerator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ShortUrlServiceImplTest {
    @Mock
    private IShortUrlRepository repository;

    @Mock
    private RandomStringGenerator randomStringGenerator;

    @InjectMocks
    private ShortUrlServiceImpl shortUrlService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    private ShortUrl createMockShortUrl(String customId, String longUrl) {
        ShortUrl url = new ShortUrl();
        url.setCustomId(customId);
        url.setLongUrl(longUrl);
        return url;
    }

    @Test
    void shouldGenerateShortUrlWithCustomId() throws DuplicateRecordException {
        GenerateShortUrlDTO dto = new GenerateShortUrlDTO();
        dto.setCustomId("12345678");
        dto.setLongUrl("http://example.com");

        // Mock repository to return false for existsByCustomId
        when(repository.existsByCustomId("12345678")).thenReturn(false);

        // Call the method
        ShortUrl result = shortUrlService.generateShortUrl(dto);

        // Verify the repository save is called
        verify(repository, times(1)).save(any(ShortUrl.class));

        // Validate the result
        assertEquals("12345678", result.getCustomId());
        assertEquals("http://example.com", result.getLongUrl());
    }

    @Test
    void shouldThrowDuplicateRecordExceptionIfCustomIdExists() {
        GenerateShortUrlDTO dto = new GenerateShortUrlDTO();
        dto.setCustomId("12345678");
        dto.setLongUrl("http://example.com");

        // Mock repository to return true for existsByCustomId
        when(repository.existsByCustomId("12345678")).thenReturn(true);

        // Call the method and expect an exception
        assertThrows(DuplicateRecordException.class, () -> shortUrlService.generateShortUrl(dto));

        // Verify that save was never called due to exception
        verify(repository, never()).save(any(ShortUrl.class));
    }

    @Test
    void shouldGenerateShortUrlWithRandomCustomIdWhenCustomIdIsNull() throws DuplicateRecordException {
        GenerateShortUrlDTO dto = new GenerateShortUrlDTO();
        dto.setCustomId(null);
        dto.setLongUrl("http://example.com");

        // Mock the random ID generation and repository checks
        when(repository.existsByCustomId(anyString())).thenReturn(false);
        when(randomStringGenerator.generateRandomAlphanumericString(8)).thenReturn("RL456U5");

        // Call the method
        ShortUrl result = shortUrlService.generateShortUrl(dto);

        // Verify the repository save is called with the generated random ID
        verify(repository, times(1)).save(any(ShortUrl.class));

        // Validate the result
        assertEquals("RL456U5", result.getCustomId());
        assertEquals("http://example.com", result.getLongUrl());
    }

    @Test
    void shouldReturnLongUrlWhenCustomIdExists() throws ResourceNotFoundException {
        String customId = "12345678";
        ShortUrl shortUrl = createMockShortUrl(customId, "http://example.com");

        // Mock the repository response
        when(repository.findByCustomId(customId)).thenReturn(Optional.of(shortUrl));

        // Call the method
        String longUrl = shortUrlService.getLongUrl(customId);

        // Verify the result
        assertEquals("http://example.com", longUrl);
    }

    @Test
    void shouldThrowResourceNotFoundExceptionWhenCustomIdDoesNotExist() {
        String customId = "nonExistentId";

        // Mock repository to return an empty optional
        when(repository.findByCustomId(customId)).thenReturn(Optional.empty());

        // Call the method and expect a ResourceNotFoundException
        assertThrows(ResourceNotFoundException.class, () -> shortUrlService.getLongUrl(customId));
    }

    @Test
    void shouldDeleteShortUrlWhenCustomIdExists() throws ResourceNotFoundException {
        String customId = "12345678";
        ShortUrl shortUrl = createMockShortUrl(customId, "http://example.com");

        // Mock the repository response
        when(repository.findByCustomId(customId)).thenReturn(Optional.of(shortUrl));

        // Call the method
        shortUrlService.deleteShortUrl(customId);

        // Verify the repository delete is called
        verify(repository, times(1)).delete(shortUrl);
    }

    @Test
    void shouldThrowResourceNotFoundExceptionWhenDeletingNonExistentShortUrl() {
        String customId = "nonExistentId";

        // Mock repository to return an empty optional
        when(repository.findByCustomId(customId)).thenReturn(Optional.empty());

        // Call the method and expect a ResourceNotFoundException
        assertThrows(ResourceNotFoundException.class, () -> shortUrlService.deleteShortUrl(customId));
    }
}