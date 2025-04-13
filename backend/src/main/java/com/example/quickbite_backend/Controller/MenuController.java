package com.example.quickbite_backend.controller;

import com.example.quickbite_backend.service.MenuService;
import com.example.quickbite_backend.model.MenuItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    @Autowired
    private MenuService service;

    @GetMapping
    public ResponseEntity<List<MenuItem>> getMenu(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {
            if (category != null) {
                return ResponseEntity.ok(service.getByCategory(category));
            }
            if (search != null) {
                return ResponseEntity.ok(service.searchByName(search));
            }
            Page<MenuItem> menuPage = service.getAll(PageRequest.of(page, size));
            return ResponseEntity.ok(menuPage.getContent());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}