import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';


function App() {
  return (
    <div className="App" >
      <NavBar />
      <div className="App-main-container">
        <Header />
        <Dashboard  />
      </div>
    </div>
  );
}

export default App;
