package com.ecommerce.backend.controller.rest;

import java.util.List;

import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.dto.request.OrderRequestDTO;
import com.ecommerce.backend.dto.response.OrderResponseDTO;
import com.ecommerce.backend.service.interfaces.OrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/orders")
public class OrderController extends BaseRestController<OrderResponseDTO, OrderRequestDTO, OrderRequestDTO> {
    
    private final OrderService orderService;

    public OrderController(OrderService orderService, PagedResourcesAssembler<OrderResponseDTO> pagedResourcesAssembler) {
        super(orderService, pagedResourcesAssembler);
        this.orderService = orderService;
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponseDTO>> findByUserId(@PathVariable Long userId) {

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        List<OrderResponseDTO> orderResponseDTO = ((OrderService) orderService).findByUserId(userId);

        return ResponseEntity.ok().body(orderResponseDTO);
    }
    
}
