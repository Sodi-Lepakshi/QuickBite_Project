import React, { useState } from 'react';
import { FaUserPlus, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address');
      return;
    }
  
    setLoading(true);
    try {
      console.log('Sending request with form:', form);
  
      const response = await axios.post('http://localhost:8080/api/auth/signup', form, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      toast.success('Signup successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
  
    } catch (err) {
      console.error('Signup error:', err);
      const errorMessage = err.response?.data || err.message || 'Signup failed due to an unknown error';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container signup-page">
      <div className="form-container">
        <h2 className="text-center">
          <FaUserPlus /> Signup
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-3">
            <input
              className="form-control"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <>
                <FaSpinner className="spin" /> Signing up...
              </>
            ) : (
              'Signup'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;