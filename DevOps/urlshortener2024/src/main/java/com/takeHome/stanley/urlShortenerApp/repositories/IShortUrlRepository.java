package com.takeHome.stanley.urlShortenerApp.repositories;

import com.takeHome.stanley.urlShortenerApp.models.ShortUrl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * the repository handles all CRUD operations between the entity ShortUrl and database table short_url
 * */
@Repository
public interface IShortUrlRepository extends JpaRepository<ShortUrl, String> {
    Optional<ShortUrl> findByCustomId(String id);

    // Custom query to check if there is an existing url with new customId already
    boolean existsByCustomId(String customId);

    // Custom query to fetch URLs where expiryTime is not null and has passed
    List<ShortUrl> findAllByExpiryTimeBefore(LocalDateTime currentTime);
}
