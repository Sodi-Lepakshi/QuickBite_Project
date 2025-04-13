package com.example.quickbite_backend.service;

import com.example.quickbite_backend.model.Order;
import com.example.quickbite_backend.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;

    public Order createOrder(Order order) {
        return repository.save(order);
    }

    public List<Order> getOrdersByUser(String userEmail) {
        return repository.findByUserEmail(userEmail);
    }
}