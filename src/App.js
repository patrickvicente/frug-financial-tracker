import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import TransactionsView from './components/Transactions/TransactionsView';


function App() {
  return (
    <div className="App" >
      <NavBar />
      <div className="App-main-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard  />} />
          <Route path="/transactions" element={<TransactionsView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
