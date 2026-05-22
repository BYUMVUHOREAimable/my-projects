package com.takeHome.stanley.urlShortenerApp.services;

import com.takeHome.stanley.urlShortenerApp.exceptions.DuplicateRecordException;
import com.takeHome.stanley.urlShortenerApp.exceptions.ResourceNotFoundException;
import com.takeHome.stanley.urlShortenerApp.models.ShortUrl;
import com.takeHome.stanley.urlShortenerApp.models.dtos.GenerateShortUrlDTO;

public interface IShortUrlService {

    public ShortUrl generateShortUrl(GenerateShortUrlDTO dto) throws DuplicateRecordException;

    public String getLongUrl(String id) throws ResourceNotFoundException;

    public void deleteShortUrl(String id) throws ResourceNotFoundException;
}
