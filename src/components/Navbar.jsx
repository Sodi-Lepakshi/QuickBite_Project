import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../App';
import { FaSignOutAlt, FaUser, FaBars, FaSun, FaMoon } from 'react-icons/fa';

function Navbar({ cart }) {
  const { token, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const userName = localStorage.getItem('name');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">
        <img
          src="https://lh3.googleusercontent.com/gg/AN12HXTjrj9-96Jigqng-yRzecTGMXSoTIhgNskMXFTRmBX9R_iqW-N5hT1FFHc0UemjAYlYUmNi60vp1G1qvLRbdhBwE1oSz4iis4A4FvcR1khW6epNSR2jsEN6vk866JxWHxiRgIhDsN1jEhAz4AoFmjwmHU2atr0bGeS7wypvdg78P91jkB93-ibjTfVOWaH3p8W67C-HWUkGgi2eqXSMCv1J04U4IonD5C6aaqU2BTlmEWUpZG4LM6QGGRGsby1zFjvvezufZKZxlo7afx_bb85F8BUh9N88a7NfvHUhnP6OyA8r1jnw5tMTQAR6jCNqBJTIlAlbAjCTcUS36_EHtG5B=s1024"
          alt="QuickBite Logo"
          style={{ height: '40px', marginRight: '8px' }}
          onError={(e) => (e.target.src = '/images/placeholder.png')}
        />
        QuickBite
      </Link>
      <div className="nav-links">
        <button className="btn btn-outline-secondary" onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
        {token ? (
          <>
            <span className="navbar-text">
              <FaUser /> Hi, {userName}
            </span>
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaBars /> Menu
              </button>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/menupage">Menu</Link></li>
                <li><Link className="dropdown-item" to="/cartpage">Cart ({cart.length})</Link></li>
                <li><Link className="dropdown-item" to="/favorites">Favorites</Link></li>
                <li><Link className="dropdown-item" to="/myorders">Orders</Link></li>
              </ul>
            </div>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-primary" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;