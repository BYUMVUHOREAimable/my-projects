package com.nationalbank.rwanda.controller;

import com.nationalbank.rwanda.model.BankingTransaction;
import com.nationalbank.rwanda.model.Message;
import com.nationalbank.rwanda.service.BankingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/banking")
@RequiredArgsConstructor
@Validated
@Tag(name = "Banking Operations", description = "API for customer banking transactions")
public class BankingController {

    private final BankingService bankingService;

    @Operation(summary = "Deposit funds", description = "Add money to customer account")
    @ApiResponse(responseCode = "200", description = "Deposit successful")
    @ApiResponse(responseCode = "400", description = "Invalid input")
    @ApiResponse(responseCode = "404", description = "Customer not found")
    @PostMapping("/deposits")
    public ResponseEntity<BankingTransaction> depositFunds(
            @Parameter(description = "Customer ID", required = true)
            @RequestParam @NotNull Long customerId,

            @Parameter(description = "Amount to deposit (must be positive)")
            @RequestParam @Valid @DecimalMin("0.01") BigDecimal amount) {
        return ResponseEntity.ok(bankingService.performSaving(customerId, amount));
    }

    @Operation(summary = "Withdraw funds", description = "Withdraw money from customer account")
    @ApiResponse(responseCode = "200", description = "Withdrawal successful")
    @ApiResponse(responseCode = "400", description = "Invalid input or insufficient funds")
    @ApiResponse(responseCode = "404", description = "Customer not found")
    @PostMapping("/withdrawals")
    public ResponseEntity<BankingTransaction> withdrawFunds(
            @Parameter(description = "Customer ID", required = true)
            @RequestParam @NotNull Long customerId,

            @Parameter(description = "Amount to withdraw (must be positive)")
            @RequestParam @Valid @DecimalMin("0.01") BigDecimal amount) {
        return ResponseEntity.ok(bankingService.performWithdraw(customerId, amount));
    }

    @Operation(summary = "Transfer funds", description = "Transfer money between accounts")
    @ApiResponse(responseCode = "200", description = "Transfer successful")
    @ApiResponse(responseCode = "400", description = "Invalid input or insufficient funds")
    @ApiResponse(responseCode = "404", description = "Customer/account not found")
    @PostMapping("/transfers")
    public ResponseEntity<BankingTransaction> transferFunds(
            @Parameter(description = "Sender customer ID", required = true)
            @RequestParam @NotNull Long fromCustomerId,

            @Parameter(description = "Recipient account number", required = true)
            @RequestParam @NotNull String toAccountNumber,

            @Parameter(description = "Amount to transfer (must be positive)")
            @RequestParam @Valid @DecimalMin("0.01") BigDecimal amount) {
        return ResponseEntity.ok(bankingService.performTransfer(fromCustomerId, toAccountNumber, amount));
    }

    @Operation(summary = "Get transaction history", description = "Retrieve customer's transactions")
    @ApiResponse(responseCode = "200", description = "Transactions retrieved")
    @ApiResponse(responseCode = "404", description = "Customer not found")
    @GetMapping("/customers/{customerId}/transactions")
    public ResponseEntity<List<BankingTransaction>> getTransactionHistory(
            @Parameter(description = "Customer ID", required = true)
            @PathVariable Long customerId) {
        return ResponseEntity.ok(bankingService.getTransactionsByCustomerId(customerId));
    }

    @Operation(summary = "Get account messages", description = "Retrieve customer's notifications")
    @ApiResponse(responseCode = "200", description = "Messages retrieved")
    @ApiResponse(responseCode = "404", description = "Customer not found")
    @GetMapping("/customers/{customerId}/messages")
    public ResponseEntity<List<Message>> getAccountMessages(
            @Parameter(description = "Customer ID", required = true)
            @PathVariable Long customerId) {
        return ResponseEntity.ok(bankingService.getMessagesByCustomerId(customerId));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An unexpected error occurred: " + ex.getMessage());
    }
}