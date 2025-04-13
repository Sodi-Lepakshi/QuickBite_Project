-- Create tables first
CREATE TABLE MENU_ITEM (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    restaurant VARCHAR(255) NOT NULL
);

CREATE TABLE ORDERS (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    quantity INT NOT NULL,
    restaurant VARCHAR(255) NOT NULL,
    timestamp DATETIME NOT NULL
);

-- Insert Menu Items (moved to data.sql, but included here for reference)
-- INSERT INTO MENU_ITEM (name, price, category, img_url, restaurant) VALUES
-- ('Paneer Butter Masala', 180, 'Main Course', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398', 'Spice Haven'),
-- ... (rest of the inserts)