package com.takeHome.stanley.urlShortenerApp.config;

import com.takeHome.stanley.urlShortenerApp.models.ShortUrl;
import com.takeHome.stanley.urlShortenerApp.repositories.IShortUrlRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
@Slf4j
public class ScheduleProcess {

    private final IShortUrlRepository shortUrlRepository;

    /**
     * Cron job checks expired urls every 10 minutes and deletes them
     * */
    @Scheduled(fixedDelay = 600000)
    public void deleteExpiredUrls() {
        log.info("Service to clean expired urls start at {}",LocalDateTime.now());
        // Fetch URLs where expiryTime is not null and is before the current time
        List<ShortUrl> expiredUrls = shortUrlRepository.findAllByExpiryTimeBefore(LocalDateTime.now());
        //RL0927

        if (!expiredUrls.isEmpty()) {
            shortUrlRepository.deleteAll(expiredUrls); // Batch delete expired URLs
            log.info("Deleted records {}",expiredUrls.size());

        }
        log.info("Service to clean expired urls end at {}",LocalDateTime.now());

    }

}
