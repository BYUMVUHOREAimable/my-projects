package com.takeHome.stanley.urlShortenerApp.controllers;

import com.takeHome.stanley.urlShortenerApp.exceptions.DuplicateRecordException;
import com.takeHome.stanley.urlShortenerApp.exceptions.ResourceNotFoundException;
import com.takeHome.stanley.urlShortenerApp.models.ShortUrl;
import com.takeHome.stanley.urlShortenerApp.models.domains.ApiResponse;
import com.takeHome.stanley.urlShortenerApp.models.dtos.GenerateShortUrlDTO;
import com.takeHome.stanley.urlShortenerApp.services.IShortUrlService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/urlShortener")
@RequiredArgsConstructor
@Slf4j
public class UrlShortenerController {

    private final IShortUrlService shortUrlService;

    private final MessageSource messageSource;

    /**
     * Create new url entity in the database
     * when successfully saved the controller returns entity object information
     * */
    @PostMapping
    public ResponseEntity<ApiResponse<ShortUrl>> createShortUrl( @Valid @RequestBody GenerateShortUrlDTO request) throws DuplicateRecordException {
        // Handle the URL shortening request
        ShortUrl response = shortUrlService.generateShortUrl(request);
        return new ApiResponse<>(response, messageSource.getMessage("responses.saveEntitySuccess", null, LocaleContextHolder.getLocale()), HttpStatus.CREATED).toResponseEntity();
    }

    /**
     * when given customId redirect/fetch the corresponding long url
     * */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> redirectToLongUrl(@PathVariable String id) throws ResourceNotFoundException {
        String response= shortUrlService.getLongUrl(id);
        log.info("Request with customId {} is redirected to long url {}",id,response);
        return new ApiResponse<>(response, messageSource.getMessage("responses.getEntitySuccess", null, LocaleContextHolder.getLocale()), HttpStatus.OK).toResponseEntity();
    }

    /**
     * Delete the url from database using its customId
     * */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteShortUrl(@PathVariable String id) throws ResourceNotFoundException {
        // Handle URL deletion
        this.shortUrlService.deleteShortUrl(id);
        return new ApiResponse<>(null, messageSource.getMessage("responses.deleteEntitySuccess", null, LocaleContextHolder.getLocale()), HttpStatus.OK).toResponseEntity();
    }
}
