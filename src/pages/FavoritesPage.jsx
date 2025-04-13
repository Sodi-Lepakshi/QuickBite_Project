import React, { useState, useEffect } from 'react';
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';

function FavoritesPage() {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  useEffect(() => {
    const handleStorageChange = () => {
      setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    toast.error('Removed from favorites!');
  };

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...cart, { ...item, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="container favorites-page">
      <h2>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p className="text-center">No favorites yet. Add some dishes!</p>
      ) : (
        <div className="row">
          {favorites.map(item => (
            <div key={item.id} className="col-md-4 col-sm-6 mb-4">
              <div className="card">
                <img src={item.imgUrl || '/images/placeholder.jpg'} alt={item.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="text-muted">Category: {item.category}</p>
                  <p className="fw-bold">₹{item.price}</p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success"
                      onClick={() => addToCart(item)}
                    >
                      <FaShoppingCart /> Add to Cart
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeFavorite(item.id)}
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;