package com.ecommerce.backend.dto;

public record PaymentLineItemDTO(
    String name,
    String description,
    Long unitAmount,
    Integer quantity,
    String imageUrl
) {}
