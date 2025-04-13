package com.example.quickbite_backend.controller;

import com.example.quickbite_backend.model.Order;
import com.example.quickbite_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService service;

    @PostMapping
    public ResponseEntity<List<Order>> createOrders(@RequestBody List<OrderDTO> orderDTOs) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            List<Order> orders = orderDTOs.stream().map(dto -> {
                Timestamp timestamp;
                try {
                    if (dto.timestamp() != null && !dto.timestamp().isEmpty()) {
                        timestamp = new Timestamp(dateFormat.parse(dto.timestamp()).getTime());
                    } else {
                        timestamp = new Timestamp(System.currentTimeMillis());
                    }
                } catch (Exception e) {
                    throw new IllegalArgumentException("Invalid timestamp format. Use YYYY-MM-DD HH:MM:SS");
                }

                return new Order(
                        dto.userEmail(),
                        dto.itemName(),
                        dto.price(),
                        dto.quantity(),
                        dto.restaurant(),
                        timestamp
                );
            }).toList();

            List<Order> savedOrders = orders.stream()
                    .map(service::createOrder)
                    .toList();

            return ResponseEntity.ok(savedOrders);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<Order>> getOrders(@RequestParam String userEmail) {
        try {
            return ResponseEntity.ok(service.getOrdersByUser(userEmail));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}

record OrderDTO(String userEmail, String itemName, int price, int quantity, String restaurant, String timestamp) {}
