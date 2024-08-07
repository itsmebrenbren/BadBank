import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useAuth } from './components/hooks/useAuth';
import { useAtomValue } from 'jotai';
import { authAtom, loadingAtom } from './components/atoms/authAtom';
import ProtectedRoute from './components/protectedRoute';
import Menu from './components/navbar';
import Home from './components/home';
import Deposit from './components/deposit';
import Login from './components/login';
import CreateAccount from './components/createAccount';
import Withdraw from './components/withdraw';
import { Navigate } from 'react-router-dom';

const App: React.FC = () => {
  const isAuthenticated = useAtomValue(authAtom);
  const loading = useAtomValue(loadingAtom);
  const { checkAuthStatus } = useAuth();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  console.log('App: isAuthenticated =', isAuthenticated);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Menu isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brenna-langillebakerFullStackBankingApplication" element={<Navigate to="/" />} />
        <Route path="/deposit" element={<ProtectedRoute element={<Deposit />} />} />
        <Route path="/withdraw" element={<ProtectedRoute element={<Withdraw />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;




