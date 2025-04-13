package com.example.quickbite_backend.repository;

import com.example.quickbite_backend.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByCategory(String category);
    List<MenuItem> findByNameContainingIgnoreCase(String name);
}