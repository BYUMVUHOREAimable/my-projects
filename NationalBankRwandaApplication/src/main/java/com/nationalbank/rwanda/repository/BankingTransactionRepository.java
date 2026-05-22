package com.nationalbank.rwanda.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nationalbank.rwanda.model.BankingTransaction;
import com.nationalbank.rwanda.model.Customer;
import com.nationalbank.rwanda.model.Message;

public interface BankingTransactionRepository extends JpaRepository<BankingTransaction, Long> {
    List<BankingTransaction> findByCustomerId(Long customerId);
}

