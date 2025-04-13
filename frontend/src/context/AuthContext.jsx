import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('token') || '';
    } catch (e) {
      console.error('Error accessing localStorage:', e);
      return '';
    }
  });

  const login = (token, name) => {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      setToken(token);
    } catch (e) {
      console.error('Error setting localStorage:', e);
    }
  };

  const logout = () => {
    try {
      localStorage.clear();
      setToken('');
    } catch (e) {
      console.error('Error clearing localStorage:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}