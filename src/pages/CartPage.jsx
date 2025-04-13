import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ProgressBar } from 'react-bootstrap';
import axios from 'axios';

function CartPage({ cart, setCart }) {
  const [orders, setOrders] = useState([]);
  const [sortBy, setSortBy] = useState('date-desc');
  const [processing, setProcessing] = useState(false);
  const userEmail = localStorage.getItem('name') + '@quickbite.com';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders', {
          params: { userEmail }
        });
        setOrders(response.data);
      } catch (err) {
        toast.error('Failed to load orders!');
      }
    };
    fetchOrders();
  }, []);

  const formatTimestamp = () => {
    const now = new Date();
    return now.getFullYear() + '-' +
           ('0' + (now.getMonth() + 1)).slice(-2) + '-' +
           ('0' + now.getDate()).slice(-2) + ' ' +
           ('0' + now.getHours()).slice(-2) + ':' +
           ('0' + now.getMinutes()).slice(-2) + ':' +
           ('0' + now.getSeconds()).slice(-2);
  };

  const updateQuantity = (id, delta) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.error('Item removed from cart!');
  };

  const handleCheckout = async () => {
    try {
       const orderData = [
          {
             userEmail: 'lepakshisodi@quickbite.com',
             itemName: 'Dal Makhani',
             price: 160,
             quantity: 1,
             restaurant: 'Some Restaurant', // Ensure this is not undefined
          },
          // Add other items here
       ];
 
       // Sending POST request
       const response = await axios.post('http://localhost:8080/api/orders', orderData, {
          headers: { 'Content-Type': 'application/json' }
       });
       console.log('Order Successful:', response.data);
    } catch (error) {
       console.error('Checkout failed:', error);
    }
 };
 
  
  

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.timestamp) - new Date(a.timestamp);
    if (sortBy === 'date-asc') return new Date(a.timestamp) - new Date(b.timestamp);
    if (sortBy === 'price-desc') return (b.price * b.quantity) - (a.price * a.quantity);
    if (sortBy === 'price-asc') return (a.price * a.quantity) - (b.price * a.quantity);
    return 0;
  });

  return (
    <div className="container cart-page">
      <h2>Your Cart & Orders</h2>
      <h4>Cart</h4>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty. Add some delicious items!</p>
      ) : (
        <>
          <div className="list-group mb-4">
            {cart.map(item => (
              <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p>₹{item.price} x {item.quantity || 1}</p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
                <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Total: ₹{cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)}</h4>
            <button className="btn btn-primary" onClick={handleCheckout} disabled={processing}>
              {processing ? 'Processing...' : 'Checkout'}
            </button>
          </div>
          {processing && <ProgressBar animated now={100} label="Order Processing" />}
        </>
      )}

      <h4>Order History</h4>
      <div className="mb-3">
        <select className="form-select w-25" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date-desc">Date (Newest First)</option>
          <option value="date-asc">Date (Oldest First)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="price-asc">Price (Low to High)</option>
        </select>
      </div>
      {sortedOrders.length === 0 ? (
        <p className="text-center">No orders yet.</p>
      ) : (
        <div className="list-group">
          {sortedOrders.map((order, index) => (
            <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{order.itemName}</h5>
                <p>₹{order.price} x {order.quantity} - {new Date(order.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;
