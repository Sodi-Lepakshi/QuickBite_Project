import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', form);
      login(response.data.token, response.data.name);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      toast.error('Login failed!');
    }
  };

  return (
    <div className="container login-page">
      <div className="form-container">
        <h2 className="text-center"><FaLock /> Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="p-4">
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
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;