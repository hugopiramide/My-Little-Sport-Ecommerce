package com.ecommerce.backend.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ShippingAddressRequestDTO(
    Long userId,
    String addressName,
    @NotBlank(message = "Recipient name is required") 
    String recipientName,
    String companyName,
    @NotBlank(message = "Street is required") 
    String street,
    String addressLine2,
    @NotBlank(message = "City is required") 
    String city,
    String state,
    @NotBlank(message = "Postal code is required") 
    String postalCode,
    @NotBlank(message = "Country code is required") 
    String countryCode,
    @NotBlank(message = "Phone number is required") 
    String phoneNumber,
    String deliveryInstructions
) {}
