package com.takeHome.stanley.urlShortenerApp.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * The entity handles the storage of the urls in a database table for persistent purposes
 * */
@Setter
@Getter
@Entity
@Table(name = "short_url")
public class ShortUrl {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String customId;  // The short alphanumeric ID
    private String longUrl;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime expiryTime;  // TTL handling
}
