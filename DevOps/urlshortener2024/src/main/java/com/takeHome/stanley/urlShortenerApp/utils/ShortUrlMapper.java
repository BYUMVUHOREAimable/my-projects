package com.takeHome.stanley.urlShortenerApp.utils;

import com.takeHome.stanley.urlShortenerApp.models.ShortUrl;
import com.takeHome.stanley.urlShortenerApp.models.dtos.GenerateShortUrlDTO;

public class ShortUrlMapper {
    // Method to map GenerateShortUrlDTO to ShortUrl entity
    public static ShortUrl toEntity(GenerateShortUrlDTO dto) {
        ShortUrl shortUrl = new ShortUrl();
        shortUrl.setCustomId(dto.getCustomId());
        shortUrl.setLongUrl(dto.getLongUrl());
        shortUrl.setExpiryTime(dto.getExpiryTime());

        return shortUrl;
    }
}
