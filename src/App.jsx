import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import MyOrders from './pages/MyOrders';
import './index.css';

export const ThemeContext = createContext();

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const handleStorageChange = () => {
      setCart(JSON.parse(localStorage.getItem('cart')) || []);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>
        <Navbar cart={cart} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/menupage" element={<ProtectedRoute><MenuPage cart={cart} setCart={setCart} /></ProtectedRoute>} />
          <Route path="/cartpage" element={<ProtectedRoute><CartPage cart={cart} setCart={setCart} /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
          <Route path="/myorders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;