package com.example.quickbite_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "MENU_ITEM")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int price;
    private String category;
    private String imgUrl;
    private String restaurant;

    // Constructors
    public MenuItem() {}

    public MenuItem(String name, int price, String category, String imgUrl, String restaurant) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.imgUrl = imgUrl;
        this.restaurant = restaurant;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getImgUrl() { return imgUrl; }
    public void setImgUrl(String imgUrl) { this.imgUrl = imgUrl; }

    public String getRestaurant() { return restaurant; }
    public void setRestaurant(String restaurant) { this.restaurant = restaurant; }
}