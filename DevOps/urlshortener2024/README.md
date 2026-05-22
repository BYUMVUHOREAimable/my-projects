# UrlShortener Application



## Getting started

This is a URL Shortener service built with Spring Boot. The service provides an API for shortening long URLs, retrieving the original URL from a shortened custom ID, and deleting shortened URLs. It uses postgres database for persistence and H2 for testing.

## Features

- Shorten long URLs with a custom ID.
- Retrieve the original URL using the custom ID.
- Delete shortened URLs.
- Validate URLs to ensure they are properly formatted.

## Technologies Used

- **Spring Boot**: For building the RESTful API.
- **Spring Data JPA**: For database interactions.
- **H2 Database**: Postgresql database for development and an In memory H2 for testing.
- **JUnit & Mockito**: For unit and integration testing.
- **Maven**: For dependency management and build.
- **Swagger**: For API documentation.

## API Endpoints

### Create Short URL

- **POST** `/api/v1/urlShortener`
- **Request Body**:
  ```json
  {
      "customId": "string", // Optional
      "longUrl": "https://example.com",
      "expiryTime": "2024-10-17T09:27:28.459Z" // Optional
  } 
  ```
- **Request Body**:
 ```json 
      {
        "timestamp": "2024-10-16T11:27:43.022429600",
        "data": {
          "id": "b027fbf9-005b-4d69-885d-4a887dad3116",
          "customId": "8X0SB4D7",
          "longUrl": "https://web.whatsapp.com",
          "expiryTime": "2024-10-17 09:27:28"
        },
        "message": "Record saved successfully",
        "status": "CREATED"
      }
```
### Redirect to Long URL

- **GET** `/api/v1/urlShortener/{id}`
- **Path Variable**: `id` - The custom ID of the shortened URL eg `8X0SB4D7`
- **Request Body**:
 ```json 
      {
        "timestamp": "2024-10-16T11:30:00.829920400",
        "data": "https://web.whatsapp.com",
        "message": "Record retrieved successfully",
        "status": "OK"
      }
```
### Delete Short URL

- **DELETE** `/api/v1/urlShortener/{id}`
- **Path Variable**: `id` - The custom ID of the shortened URL eg `8X0SB4D7`
- **Request Body**:
 ```json 
      {
        "timestamp": "2024-10-16T11:33:17.069717600",
        "data": null,
        "message": "Record removed successfully",
        "status": "OK"
      }
```
## Prerequisites

- [ ] [Java 17 or Higher](https://www.oracle.com/java/technologies/javase/17-relnote-issues.html) 
- [ ] [Spring boot 3+](https://spring.io/blog/2024/05/23/spring-boot-3-3-0-available-now)
- [ ] Maven
- [ ] [Swagger UI](https://swagger.io/docs/)
## Getting Started
1. Clone the repository:
    ```
   git clone https://github.com/yourusername/url-shortener-app.git
   cd url-shortener-app
   ```
2. Set database
    Go to file `properties-dev.properties` in `/resource` folder then update the parameters below as per your database settings
    ```
   spring.datasource.url=jdbc:postgresql://localhost:5432/short_url_db?useSSL=false
   spring.datasource.username=postgres
   spring.datasource.password=postgres
   ```
3. Build the project:
   ```
   mvn clean install
   ```
4. Run the application:
   ```
   mvn spring-boot:run
   ```
5. Access the API at `http://localhost:8080/api/v1/urlShortener` 

## Testing
Unit tests and integration tests are included in the project. To run the tests, use the following command:
```
mvn test
```

