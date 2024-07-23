import { useState, useEffect, useCallback } from 'react';
import { useSetAtom } from 'jotai';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { userAtom, User } from '../atoms/userAtom';

interface DecodedToken {
  user: {
    id: string;
  };
  exp: number;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [token, setToken] = useState<string | null>(null);
  const setUser = useSetAtom(userAtom);

  const checkAuthStatus = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        axios.get<User>(`http://localhost:3002/api/users/${decoded.user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('User data fetched on checkAuthStatus:', response.data); // Debugging log
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch((err) => {
          console.error('Error fetching user data:', err);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        })
        .finally(() => {
          setLoading(false);  // Set loading to false after check
        });
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setLoading(false);  // Set loading to false if token is expired
      }
    } else {
      setLoading(false);  // Set loading to false if no token is found
    }
  }, [setUser]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (email: string, password: string) => {
    const response = await axios.post<{ token: string }>('http://localhost:3002/api/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    setToken(token);

    const decoded: DecodedToken = jwtDecode(token);
    const userResponse = await axios.get<User>(`http://localhost:3002/api/users/${decoded.user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('User data fetched on login:', userResponse.data);
    setUser(userResponse.data);
    setIsAuthenticated(true);
    setLoading(false);  // Set loading to false after login
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);  // Set loading to false after logout
  };

  return { isAuthenticated, loading, token, login, logout, checkAuthStatus };
};
