import React, { useState, useEffect } from 'react';
import { FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const userEmail = localStorage.getItem('name') + '@quickbite.com'; // Mock email

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

  return (
    <div className="container orders-page">
      <h2>My Order History</h2>
      {orders.length === 0 ? (
        <div className="alert alert-info text-center">You haven't ordered anything yet! Explore the menu.</div>
      ) : (
        <div className="row">
          {orders.map((order, index) => (
            <div key={index} className="col-md-4 col-sm-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{order.itemName}</h5>
                  <p className="card-text text-muted">Price: ₹{order.price} x {order.quantity}</p>
                  <p className="card-text text-secondary">
                    <FaClock /> {new Date(order.timestamp).toLocaleString()}
                  </p>
                  <p className="card-text">Status: {Math.random() > 0.5 ? 'Delivered' : 'Processing'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;