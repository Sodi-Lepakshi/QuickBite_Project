import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaUtensils, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ProgressBar } from 'react-bootstrap';

function HomePage() {
  const { token } = useContext(AuthContext);
  const userName = localStorage.getItem('name');
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);
  const [cart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    if (token && orders.length > 0) {
      toast.info(`Welcome back, ${userName}! You have ${orders.length} past orders.`, {
        position: 'top-right',
      });
    }
  }, [orders, userName, token]);

  const totalSpent = orders.reduce((sum, order) => sum + order.price, 0);
  const orderCompletion = Math.min((orders.length / 10) * 100, 100);

  return (
    <div className="container homepage">
      <div className="hero-section text-center">
        <h1>Welcome, {userName}! <FaUtensils /></h1>
        <p className="lead">Craving something delicious? Explore our menu now!</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => (window.location.href = '/menupage')}
        >
          Order Now
        </button>
      </div>
      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="text-muted">Order Stats</h5>
              <p>Total Orders: {orders.length}</p>
              <p>Total Spent: ₹{totalSpent}</p>
              <ProgressBar now={orderCompletion} label={`${orderCompletion}%`} />
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="text-muted">Quick Menu</h5>
              <p>Explore dishes from top restaurants!</p>
              <button
                className="btn btn-primary w-100 mt-2"
                onClick={() => (window.location.href = '/menupage')}
              >
                Go to Menu
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="text-muted"><FaShoppingCart /> Your Cart</h5>
              <p>Items: {cart.length}</p>
              <p>Total: ₹{cart.reduce((sum, item) => sum + item.price, 0)}</p>
              <button
                className="btn btn-primary w-100 mt-2"
                onClick={() => (window.location.href = '/cartpage')}
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;