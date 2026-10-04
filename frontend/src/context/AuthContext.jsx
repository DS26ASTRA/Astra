import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const storedRole = localStorage.getItem('role');
          
          let endpoint = '';
          if (storedRole === 'TEAM') endpoint = '/api/teams/profile';
          else if (storedRole === 'FACULTY') endpoint = '/api/faculty/profile';
          else if (storedRole === 'ADMIN') endpoint = '/api/admin/profile';
          
          if (endpoint) {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${endpoint}`);
            setUser(res.data.data);
            setRole(storedRole);
          } else {
            logout();
          }
        } catch (error) {
          console.error('Error fetching user profile', error);
          logout();
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = (userData, userRole, jwtToken) => {
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('role', userRole);
    setToken(jwtToken);
    setRole(userRole);
    setUser(userData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, role, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
