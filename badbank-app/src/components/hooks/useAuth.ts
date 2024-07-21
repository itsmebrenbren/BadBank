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
  const setUser = useSetAtom(userAtom);

  const checkAuthStatus = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        axios.get<User>(`http://localhost:3002/api/users/${decoded.user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        });
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    }
  }, [setUser]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (email: string, password: string) => {
    const response = await axios.post<{ token: string }>('http://localhost:3002/api/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);

    const decoded: DecodedToken = jwtDecode(token);
    const userResponse = await axios.get<User>(`http://localhost:3002/api/users/${decoded.user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(userResponse.data);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout, checkAuthStatus };
};


