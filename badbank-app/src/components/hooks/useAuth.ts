// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { useSetAtom } from 'jotai';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { userAtom, User } from '../atoms/userAtom';
import { authAtom, loadingAtom } from '../atoms/authAtom';

interface DecodedToken {
  user: {
    id: string;
  };
  exp: number;
}

export const useAuth = () => {
  const setAuth = useSetAtom(authAtom);
  const setLoading = useSetAtom(loadingAtom);
  const [token, setToken] = useState<string | null>(null);
  const setUser = useSetAtom(userAtom);

  const checkAuthStatus = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        axios.get<User>(`https://104.248.233.243.nip.io/api/users/${decoded.user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            console.log('User data fetched on checkAuthStatus:', response.data);
            setUser(response.data);
            setAuth(true);
          })
          .catch((err) => {
            console.error('Error fetching user data:', err);
            localStorage.removeItem('token');
            setAuth(false);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        localStorage.removeItem('token');
        setAuth(false);
        setLoading(false);
      }
    } else {
      setAuth(false);
      setLoading(false);
    }
  }, [setAuth, setLoading, setUser]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const response = await axios.post<{ token: string }>('https://104.248.233.243.nip.io/api/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    setToken(token);

    const decoded: DecodedToken = jwtDecode(token);
    const userResponse = await axios.get<User>(`https://104.248.233.243.nip.io/api/users/${decoded.user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('User data fetched on login:', userResponse.data);
    setUser(userResponse.data);
    setAuth(true);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setAuth(false);
    setLoading(false);
  };

  return { login, logout, checkAuthStatus };
};

