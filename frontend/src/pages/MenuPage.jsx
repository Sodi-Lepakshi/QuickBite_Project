import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaSearch, FaHeart, FaChevronDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

function MenuPage({ cart, setCart }) {
  const [menuData, setMenuData] = useState([]);
  const [expandedRestaurant, setExpandedRestaurant] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const navigate = useNavigate();

  const debouncedSearch = _.debounce((value) => {
    setSearch(value);
  }, 500);

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/menu', {
          params: {
            category: filter !== 'All' ? filter : undefined,
            search: search || undefined,
          },
        });
        setMenuData(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching menu:', err);
        setError('Failed to load menu. Please try again.');
        toast.error('Couldn’t load menu data!');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [filter, search]);

  const addToCart = (item) => {
    const updatedCart = [...cart, { ...item, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success(`${item.name} added to cart!`, { position: 'top-right' });
    navigate('/cartpage');
  };

  const toggleFavorite = (item) => {
    let updatedFavorites = [...favorites];
    if (favorites.some(fav => fav.id === item.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== item.id);
      toast.info(`${item.name} removed from favorites!`);
    } else {
      updatedFavorites.push(item);
      toast.success(`${item.name} added to favorites!`);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const toggleRestaurant = (restaurantName) => {
    setExpandedRestaurant(expandedRestaurant === restaurantName ? null : restaurantName);
  };

  return (
    <div className="container menu-page">
      <h2>Explore Our Menu</h2>
      <div className="d-flex justify-content-between mb-4 flex-wrap">
        <div className="input-group w-50 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search dishes..."
            onChange={(e) => debouncedSearch(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button">
            <FaSearch />
          </button>
        </div>
        <select
          className="form-select w-25 mb-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Main Course">Main Course</option>
          <option value="Fast Food">Fast Food</option>
          <option value="South Indian">South Indian</option>
          <option value="Beverages">Beverages</option>
        </select>
      </div>

      {loading && <div className="text-center"><div className="spinner-border" role="status"></div></div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && Object.entries(
        menuData.reduce((acc, item) => {
          acc[item.restaurant] = acc[item.restaurant] || [];
          acc[item.restaurant].push(item);
          return acc;
        }, {})
      ).map(([restaurantName, items]) => (
        <div key={restaurantName} className="mb-4">
          <h3
            className="restaurant-title"
            onClick={() => toggleRestaurant(restaurantName)}
          >
            {restaurantName} <FaChevronDown className={expandedRestaurant === restaurantName ? 'rotate' : ''} />
          </h3>
          {expandedRestaurant === restaurantName && (
            <div className="row">
              {items.map((item) => (
                <div key={item.id} className="col-md-4 col-sm-6 mb-4">
                  <div className="card">
                    <img
                      src={item.imgUrl}
                      alt={item.name}
                      className="card-img-top"
                      onError={(e) => (e.target.src = '/images/placeholder.jpg')}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="text-muted">Category: {item.category}</p>
                      <p className="fw-bold">₹{item.price}</p>
                      <div className="d-flex gap-2">
                        <button className="btn btn-success" onClick={() => addToCart(item)}>
                          <FaShoppingCart /> Add to Cart
                        </button>
                        <button
                          className={`btn ${favorites.some(fav => fav.id === item.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                          onClick={() => toggleFavorite(item)}
                        >
                          <FaHeart /> {favorites.some(fav => fav.id === item.id) ? 'Remove' : 'Favorite'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MenuPage;