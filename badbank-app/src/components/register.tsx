import React, { useState } from 'react';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { userAtom, User } from './atoms/userAtom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Ensure this is the correct import

interface RegisterResponse {
  token: string;
}

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<RegisterResponse>('/api/auth/register', {
        name,
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode<User>(token); // Correctly use jwtDecode with the User type
      setUser(decoded);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Register;
