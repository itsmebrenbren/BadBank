import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Menu from './components/navbar.jsx';
import Home from './components/home.jsx';
import Deposit from './components/deposit.jsx';
import Withdraw from './components/withdraw.jsx';
import AllData from './components/allData.jsx';
import CreateAccount from './components/createAccount.jsx';

function App() {
  return (
    <BrowserRouter>
    <Menu />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/alldata" element={<AllData />} />
      <Route path="/createaccount" element={<CreateAccount />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
