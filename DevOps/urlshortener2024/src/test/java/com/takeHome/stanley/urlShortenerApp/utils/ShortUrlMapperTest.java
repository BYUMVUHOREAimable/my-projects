package com.takeHome.stanley.urlShortenerApp.utils;

import com.takeHome.stanley.urlShortenerApp.models.ShortUrl;
import com.takeHome.stanley.urlShortenerApp.models.dtos.GenerateShortUrlDTO;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class ShortUrlMapperTest {

    @Test
    void shouldMapAllFieldsFromDtoToEntity() {
        // Given
        GenerateShortUrlDTO dto = new GenerateShortUrlDTO();
        dto.setCustomId("customID");
        dto.setLongUrl("http://example.com");
        LocalDateTime expiryTime = LocalDateTime.now().plusDays(1);
        dto.setExpiryTime(expiryTime);

        // When
        ShortUrl shortUrl = ShortUrlMapper.toEntity(dto);

        // Then
        assertNotNull(shortUrl);
        assertEquals("customID", shortUrl.getCustomId());
        assertEquals("http://example.com", shortUrl.getLongUrl());
        assertEquals(expiryTime, shortUrl.getExpiryTime());
    }
    @Test
    void shouldMapCustomIdToNullWhenNotProvidedInDto() {
        // Given
        GenerateShortUrlDTO dto = new GenerateShortUrlDTO();
        dto.setCustomId(null);
        dto.setLongUrl("http://example.com");
        LocalDateTime expiryTime = LocalDateTime.now().plusDays(1);
        dto.setExpiryTime(expiryTime);

        // When
        ShortUrl shortUrl = ShortUrlMapper.toEntity(dto);

        // Then
        assertNotNull(shortUrl);
        assertNull(shortUrl.getCustomId());
        assertEquals("http://example.com", shortUrl.getLongUrl());
        assertEquals(expiryTime, shortUrl.getExpiryTime());
    }

    @Test
    void shouldMapExpiryTimeToNullWhenNotProvidedInDto() {
        // Given
        GenerateShortUrlDTO dto = new GenerateShortUrlDTO();
        dto.setCustomId("customID");
        dto.setLongUrl("http://example.com");
        dto.setExpiryTime(null);

        // When
        ShortUrl shortUrl = ShortUrlMapper.toEntity(dto);

        // Then
        assertNotNull(shortUrl);
        assertEquals("customID", shortUrl.getCustomId());
        assertEquals("http://example.com", shortUrl.getLongUrl());
        assertNull(shortUrl.getExpiryTime());
    }
    @Test
    void shouldMapLongUrlToNullWhenNotProvidedInDto() {
        // Given
        GenerateShortUrlDTO dto = new GenerateShortUrlDTO();
        dto.setCustomId("customID");
        dto.setLongUrl(null);
        LocalDateTime expiryTime = LocalDateTime.now().plusDays(1);
        dto.setExpiryTime(expiryTime);

        // When
        ShortUrl shortUrl = ShortUrlMapper.toEntity(dto);

        // Then
        assertNotNull(shortUrl);
        assertEquals("customID", shortUrl.getCustomId());
        assertNull(shortUrl.getLongUrl());
        assertEquals(expiryTime, shortUrl.getExpiryTime());
    }
    @Test
    void shouldMapAllFieldsToNullWhenDtoIsEmpty() {
        // Given
        GenerateShortUrlDTO dto = new GenerateShortUrlDTO();

        // When
        ShortUrl shortUrl = ShortUrlMapper.toEntity(dto);

        // Then
        assertNotNull(shortUrl);
        assertNull(shortUrl.getCustomId());
        assertNull(shortUrl.getLongUrl());
        assertNull(shortUrl.getExpiryTime());
    }
    @Test
    void shouldMapOnlyLongUrlWhenOtherFieldsAreNull() {
        // Given
        GenerateShortUrlDTO dto = new GenerateShortUrlDTO();
        dto.setLongUrl("http://example.com");

        // When
        ShortUrl shortUrl = ShortUrlMapper.toEntity(dto);

        // Then
        assertNotNull(shortUrl);
        assertNull(shortUrl.getCustomId());
        assertEquals("http://example.com", shortUrl.getLongUrl());
        assertNull(shortUrl.getExpiryTime());
    }


}