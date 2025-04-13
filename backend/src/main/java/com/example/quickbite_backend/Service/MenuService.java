package com.example.quickbite_backend.service;

import com.example.quickbite_backend.repository.MenuItemRepository;
import com.example.quickbite_backend.model.MenuItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    @Autowired
    private MenuItemRepository repository;

    public Page<MenuItem> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<MenuItem> getByCategory(String category) {
        if (category == null || category.trim().isEmpty()) {
            throw new IllegalArgumentException("Category cannot be empty");
        }
        return repository.findByCategory(category);
    }

    public List<MenuItem> searchByName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Search term cannot be empty");
        }
        return repository.findByNameContainingIgnoreCase(name);
    }
}