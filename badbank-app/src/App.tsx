import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useAuth } from './components/hooks/useAuth';
import Menu from './components/navbar';
import Home from './components/home';
import Deposit from './components/deposit';
// import Withdraw from './components/withdraw';
import Login from './components/login';
import CreateAccount from './components/createAccount';
import Withdraw from './components/withdraw';

const App: React.FC = () => {
    const { isAuthenticated, checkAuthStatus } = useAuth();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
      <BrowserRouter>
        <Menu isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deposit" element={isAuthenticated ? <Deposit /> : <Login />}/>
          <Route path="/withdraw" element={isAuthenticated ? <Withdraw /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createaccount" element={<CreateAccount />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;

