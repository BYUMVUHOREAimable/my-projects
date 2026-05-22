package com.nationalbank.rwanda.service;

import com.nationalbank.rwanda.model.Customer;
import com.nationalbank.rwanda.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository = null;
    
    public Customer registerCustomer(Customer customer) {
        customer.setBalance(BigDecimal.ZERO);  // Initialize balance to zero on registration
        customer.setLastUpdateDateTime(LocalDateTime.now());  // Set current date-time as last update
        return customerRepository.save(customer);
    }
    
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }
    
    public Customer getCustomerByAccountNumber(String accountNumber) {
        return customerRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }
    
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }
}
