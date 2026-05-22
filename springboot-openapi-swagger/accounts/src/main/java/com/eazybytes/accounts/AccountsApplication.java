package com.eazybytes.accounts;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
@OpenAPIDefinition(info = @Info(
		title = "Accounts microservice REST API Documentation",
		description = "BAIBank Accounts microservice REST API Documentation",
		version = "v1",
		contact = @Contact(
				name = "BYUMVUHORE Aimable",
				email = "aimablebyumvuhore@gmail.com",
				url = "https://bai-personal-protofolio.vercel.app/"
		),
		license = @License(
				name = "Apache 2.0",
				url = "https://bai-personal-protofolio.vercel.app/"
		)
), externalDocs = @ExternalDocumentation(
		description = "BAIBank Accounts microservice REST API Documentation",
		url = "https://bai-personal-protofolio.vercel.app/swagger-ui.html"
)
)
public class AccountsApplication {

	public static void main(String[] args) {
		SpringApplication.run(AccountsApplication.class, args);
	}
}
