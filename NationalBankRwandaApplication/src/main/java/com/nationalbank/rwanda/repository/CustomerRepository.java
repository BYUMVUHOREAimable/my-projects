package com.nationalbank.rwanda.repository;

import com.nationalbank.rwanda.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByAccountNumber(String accountNumber);
    Optional<Customer> findByEmail(String email);
}
