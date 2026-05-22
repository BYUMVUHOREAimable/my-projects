package com.takeHome.stanley.urlShortenerApp.services.impl;

import com.takeHome.stanley.urlShortenerApp.exceptions.DuplicateRecordException;
import com.takeHome.stanley.urlShortenerApp.exceptions.ResourceNotFoundException;
import com.takeHome.stanley.urlShortenerApp.models.ShortUrl;
import com.takeHome.stanley.urlShortenerApp.models.dtos.GenerateShortUrlDTO;
import com.takeHome.stanley.urlShortenerApp.repositories.IShortUrlRepository;
import com.takeHome.stanley.urlShortenerApp.services.IShortUrlService;
import com.takeHome.stanley.urlShortenerApp.utils.RandomStringGenerator;
import com.takeHome.stanley.urlShortenerApp.utils.ShortUrlMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Slf4j
public class ShortUrlServiceImpl implements IShortUrlService {

    private final IShortUrlRepository repository;
    private final RandomStringGenerator randomStringGenerator;
    /**
     * Save the new url, if the custom id is not given make sure that a unique id is assigned to
     * the new url.
     * */
    @Override
    public ShortUrl generateShortUrl(GenerateShortUrlDTO dto) throws DuplicateRecordException {
        ShortUrl shortUrl = ShortUrlMapper.toEntity(dto);

        if(this.repository.existsByCustomId(shortUrl.getCustomId())){
            log.info("Saving Short url with customId {} and long url {} failed because same customId is already used",shortUrl.getCustomId(),shortUrl.getLongUrl());
            throw new DuplicateRecordException("ShortUrl", "customId", dto.getCustomId());
        }
        if(dto.getCustomId()==null || dto.getCustomId().equalsIgnoreCase("")){
            generateUniqueCustomId(shortUrl);
        }
         repository.save(shortUrl);
        log.info("New Short url with customId {} and long url {} is  created successfully",shortUrl.getCustomId(),shortUrl.getLongUrl());
        return shortUrl;
    }

    /**
     * Generate random custom id, check if it already exists in database if yes generate a new one and check again
     * until unique id is found
     * */
    private void generateUniqueCustomId(ShortUrl shortUrl) {
        boolean uniqueId= false;
        while (!uniqueId){

            String randomId = randomStringGenerator.generateRandomAlphanumericString(8);
            if(!(this.repository.existsByCustomId(randomId))){
                shortUrl.setCustomId(randomId);
                uniqueId =  true;
            }
        }
    }

    /**
     * Return long url when custom id is passed as argument
     * */
    @Override
    public String getLongUrl(String id) throws ResourceNotFoundException {
        ShortUrl entity = this.repository.findByCustomId(id).orElseThrow(
                () ->  new ResourceNotFoundException("ShortUrl", "customId", id));
        return entity.getLongUrl();
    }

    @Override
    public void deleteShortUrl(String id) throws ResourceNotFoundException {
        ShortUrl entity = this.repository.findByCustomId(id).orElseThrow(
                () ->  new ResourceNotFoundException("ShortUrl", "customId", id));
        this.repository.delete(entity);
        log.info("Short url with customId {} is  deleted successfully",id);

    }
}
