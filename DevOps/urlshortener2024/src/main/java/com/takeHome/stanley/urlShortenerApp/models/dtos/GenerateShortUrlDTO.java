package com.takeHome.stanley.urlShortenerApp.models.dtos;

import lombok.Data;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class GenerateShortUrlDTO {
    private String customId;  // The short alphanumeric ID

    @NotEmpty
    @URL
    private String longUrl;
    private LocalDateTime expiryTime;
}
