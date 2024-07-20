import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { userAtom, User } from './atoms/userAtom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<LoginResponse>('/api/auth/login', data);
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;

