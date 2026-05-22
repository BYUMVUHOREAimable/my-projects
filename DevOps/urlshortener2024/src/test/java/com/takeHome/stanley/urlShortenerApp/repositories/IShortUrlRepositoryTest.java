package com.takeHome.stanley.urlShortenerApp.repositories;

import com.takeHome.stanley.urlShortenerApp.models.ShortUrl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@TestPropertySource(locations = "classpath:application-test.properties")
class IShortUrlRepositoryTest {

    @Autowired
    private IShortUrlRepository shortUrlRepository;

    private ShortUrl shortUrl;

    @BeforeEach
    public void setUp() {
        shortUrl = new ShortUrl();
        shortUrl.setCustomId("customId123");
        shortUrl.setLongUrl("http://example.com");
        shortUrl.setExpiryTime(LocalDateTime.now().plusDays(1)); // Set expiry time for future
        shortUrlRepository.save(shortUrl);
    }

    @Test
    void shouldFindShortUrlByCustomId() {
        Optional<ShortUrl> foundUrl = shortUrlRepository.findByCustomId("customId123");
        assertTrue(foundUrl.isPresent(), "Short URL should be found by custom ID");
        assertThat(foundUrl.get().getLongUrl()).isEqualTo("http://example.com");
    }

    @Test
    void shouldNotFindShortUrlByNonExistentCustomId() {
        Optional<ShortUrl> foundUrl = shortUrlRepository.findByCustomId("nonExistentId");
        assertTrue(foundUrl.isEmpty(), "No Short URL should be found for a non-existent custom ID");
    }

    @Test
    void shouldExistByCustomId() {
        boolean exists = shortUrlRepository.existsByCustomId("customId123");
        assertTrue(exists, "Short URL should exist by custom ID");
    }

    @Test
    void shouldNotExistByCustomId() {
        boolean exists = shortUrlRepository.existsByCustomId("nonExistentId");
        assertTrue(!exists, "Short URL should not exist by a non-existent custom ID");
    }

    @Test
    void shouldFindAllExpiredUrls() {
        // Create an expired ShortUrl
        ShortUrl expiredUrl = new ShortUrl();
        expiredUrl.setCustomId("expiredId");
        expiredUrl.setLongUrl("http://expired.com");
        expiredUrl.setExpiryTime(LocalDateTime.now().minusDays(1)); // Set expiry time to past
        shortUrlRepository.save(expiredUrl);

        // Act
        List<ShortUrl> expiredUrls = shortUrlRepository.findAllByExpiryTimeBefore(LocalDateTime.now());

        // Assert
        assertThat(expiredUrls).hasSize(1).contains(expiredUrl);
    }

    @Test
    void shouldNotFindExpiredUrlsWhenNoneExist() {
        List<ShortUrl> expiredUrls = shortUrlRepository.findAllByExpiryTimeBefore(LocalDateTime.now());
        assertThat(expiredUrls).isEmpty();
    }

}