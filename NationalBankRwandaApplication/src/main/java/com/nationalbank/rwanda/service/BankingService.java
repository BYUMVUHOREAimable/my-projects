package com.nationalbank.rwanda.service;

import com.nationalbank.rwanda.model.BankingTransaction;
import com.nationalbank.rwanda.model.Customer;
import com.nationalbank.rwanda.model.Message;
import com.nationalbank.rwanda.model.TransactionType;
import com.nationalbank.rwanda.repository.BankingTransactionRepository;
import com.nationalbank.rwanda.repository.CustomerRepository;
import com.nationalbank.rwanda.repository.MessageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BankingService {
    private final BankingTransactionRepository transactionRepository;
    private final MessageRepository messageRepository;
    private final EmailService emailService = new EmailService();
    
    @Autowired
    private CustomerRepository customerRepository;

    public Customer createCustomer(Customer customer) {
        // Save the customer to the database
        return customerRepository.save(customer);
    }
    
    @Transactional
    public BankingTransaction performSaving(Long customerId, BigDecimal amount) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        customer.setBalance(customer.getBalance().add(amount));
        customer.setLastUpdateDateTime(LocalDateTime.now());
        
        BankingTransaction transaction = new BankingTransaction();
        transaction.setCustomer(customer);
        transaction.setAccount(customer.getAccountNumber());
        transaction.setAmount(amount);
        transaction.setType(TransactionType.SAVING);
        transaction.setBankingDateTime(LocalDateTime.now());
        
        BankingTransaction savedTransaction = transactionRepository.save(transaction);
        customerRepository.save(customer);
        
        sendNotification(customer, amount, "SAVING", savedTransaction);
        
        return savedTransaction;
    }
    
    @Transactional
    public BankingTransaction performWithdraw(Long customerId, BigDecimal amount) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        if (customer.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient balance");
        }
        
        customer.setBalance(customer.getBalance().subtract(amount));
        customer.setLastUpdateDateTime(LocalDateTime.now());
        
        BankingTransaction transaction = new BankingTransaction();
        transaction.setCustomer(customer);
        transaction.setAccount(customer.getAccountNumber());
        transaction.setAmount(amount);
        transaction.setType(TransactionType.WITHDRAW);
        transaction.setBankingDateTime(LocalDateTime.now());
        
        BankingTransaction savedTransaction = transactionRepository.save(transaction);
        customerRepository.save(customer);
        
        sendNotification(customer, amount, "WITHDRAW", savedTransaction);
        
        return savedTransaction;
    }
    
    @Transactional
    public BankingTransaction performTransfer(Long fromCustomerId, String toAccountNumber, BigDecimal amount) {
        Customer fromCustomer = customerRepository.findById(fromCustomerId)
                .orElseThrow(() -> new RuntimeException("Sender customer not found"));
        
        Customer toCustomer = customerRepository.findByAccountNumber(toAccountNumber)
                .orElseThrow(() -> new RuntimeException("Recipient customer not found"));
        
        if (fromCustomer.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient balance");
        }
        
        // Deduct from sender
        fromCustomer.setBalance(fromCustomer.getBalance().subtract(amount));
        fromCustomer.setLastUpdateDateTime(LocalDateTime.now());
        
        // Add to recipient
        toCustomer.setBalance(toCustomer.getBalance().add(amount));
        toCustomer.setLastUpdateDateTime(LocalDateTime.now());
        
        // Create transfer transaction for sender
        BankingTransaction transaction = new BankingTransaction();
        transaction.setCustomer(fromCustomer);
        transaction.setAccount(fromCustomer.getAccountNumber());
        transaction.setAmount(amount);
        transaction.setType(TransactionType.TRANSFER);
        transaction.setBankingDateTime(LocalDateTime.now());
        
        BankingTransaction savedTransaction = transactionRepository.save(transaction);
        customerRepository.save(fromCustomer);
        customerRepository.save(toCustomer);
        
        sendNotification(fromCustomer, amount, "TRANSFER", savedTransaction);
        
        return savedTransaction;
    }
    
    private void sendNotification(Customer customer, BigDecimal amount, String transactionType, BankingTransaction transaction) {
        String messageContent = String.format(
            "Dear %s %s, Your %s of %s on your account %s has been Completed Successfully.",
            customer.getFirstName(),
            customer.getLastName(),
            transactionType,
            amount.toString(),
            customer.getAccountNumber()
        );
        
        // Save message to database
        Message message = new Message();
        message.setCustomer(customer);
        message.setMessage(messageContent);
        message.setDateTime(LocalDateTime.now());
        messageRepository.save(message);
        
        // Send email
        emailService.sendEmail(
            customer.getEmail(),
            "Transaction Notification",
            messageContent
        );
    }
    
    public List<BankingTransaction> getTransactionsByCustomerId(Long customerId) {
        return transactionRepository.findByCustomerId(customerId);
    }
    
    public List<Message> getMessagesByCustomerId(Long customerId) {
        return messageRepository.findByCustomerId(customerId);
    }
}
