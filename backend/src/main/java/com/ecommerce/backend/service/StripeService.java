package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.PaymentRequestDTO;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class StripeService {

    public PaymentIntent createPaymentIntent(PaymentRequestDTO paymentRequest) throws StripeException {
        long amountInCents = paymentRequest.amount().multiply(new BigDecimal("100")).longValue();

        PaymentIntentCreateParams params =
          PaymentIntentCreateParams.builder()
            .setAmount(amountInCents)
            .setCurrency(paymentRequest.currency() != null ? paymentRequest.currency().toUpperCase() : "EUR")
            .setDescription(paymentRequest.description())
            .setAutomaticPaymentMethods(
              PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                .setEnabled(true)
                .build()
            )
            .build();

        return PaymentIntent.create(params);
    }

    public Session createCheckoutSession(PaymentRequestDTO paymentRequest) throws StripeException {
        long amountInCents = paymentRequest.amount().multiply(new BigDecimal("100")).longValue();
        SessionCreateParams.Builder paramsBuilder =
            SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .putMetadata("order_id", String.valueOf(paymentRequest.orderId()));

        List<com.ecommerce.backend.dto.PaymentLineItemDTO> items = paymentRequest.items();
        if (items != null && !items.isEmpty()) {
            for (com.ecommerce.backend.dto.PaymentLineItemDTO it : items) {
                SessionCreateParams.LineItem.PriceData.ProductData productData;
                if (it.imageUrl() != null && !it.imageUrl().isBlank()) {
                    productData = SessionCreateParams.LineItem.PriceData.ProductData.builder()
                        .setName(it.name())
                        .setDescription(it.description())
                        .addImage(it.imageUrl())
                        .build();
                } else {
                    productData = SessionCreateParams.LineItem.PriceData.ProductData.builder()
                        .setName(it.name())
                        .setDescription(it.description())
                        .build();
                }

                SessionCreateParams.LineItem.PriceData priceData =
                    SessionCreateParams.LineItem.PriceData.builder()
                        .setCurrency(paymentRequest.currency() != null ? paymentRequest.currency().toLowerCase() : "eur")
                        .setUnitAmount(it.unitAmount())
                        .setProductData(productData)
                        .build();

                SessionCreateParams.LineItem lineItem =
                    SessionCreateParams.LineItem.builder()
                        .setPriceData(priceData)
                        .setQuantity(it.quantity().longValue())
                        .build();

                paramsBuilder.addLineItem(lineItem);
            }
        } else {
            SessionCreateParams.LineItem.PriceData.ProductData productData =
                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                    .setName("Order Payment")
                    .setDescription(paymentRequest.description())
                    .build();

            SessionCreateParams.LineItem.PriceData priceData =
                SessionCreateParams.LineItem.PriceData.builder()
                    .setCurrency(paymentRequest.currency() != null ? paymentRequest.currency().toLowerCase() : "eur")
                    .setUnitAmount(amountInCents)
                    .setProductData(productData)
                    .build();

            SessionCreateParams.LineItem lineItem =
                SessionCreateParams.LineItem.builder()
                    .setPriceData(priceData)
                    .setQuantity(1L)
                    .build();

            paramsBuilder.addLineItem(lineItem);
        }

        if (paymentRequest.successUrl() != null && !paymentRequest.successUrl().isBlank()) {
            paramsBuilder.setSuccessUrl(paymentRequest.successUrl());
        } else {
            paramsBuilder.setSuccessUrl("http://localhost:5173/order-success?orderId=" + paymentRequest.orderId() + "&session_id={CHECKOUT_SESSION_ID}");
        }

        if (paymentRequest.cancelUrl() != null && !paymentRequest.cancelUrl().isBlank()) {
            paramsBuilder.setCancelUrl(paymentRequest.cancelUrl());
        } else {
            paramsBuilder.setCancelUrl("http://localhost:5173/checkout");
        }

        return Session.create(paramsBuilder.build());
    }
}
