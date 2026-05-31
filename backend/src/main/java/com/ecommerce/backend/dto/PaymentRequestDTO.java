package com.ecommerce.backend.dto;

import java.math.BigDecimal;

import java.util.List;

public record PaymentRequestDTO(
    BigDecimal amount,
    String currency,
    String description,
    Long orderId,
    String successUrl,
    String cancelUrl,
    List<PaymentLineItemDTO> items
){}
