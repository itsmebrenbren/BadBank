import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Menu from './components/navbar';
import Home from './components/home';
import Deposit from './components/deposit';
// import Withdraw from './components/withdraw';
import Login from './components/login';
import CreateAccount from './components/createAccount';

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deposit" element={<Deposit />} />
          {/* <Route path="/withdraw" element={<Withdraw />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/createaccount" element={<CreateAccount />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;

