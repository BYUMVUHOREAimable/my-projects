import React, { useState } from 'react';
import Login from './Login';
import './App.css'; 

function App() {
  const [message, setMessage] = useState('BYUMVUHORE Aimable');
  const update = () => setMessage('NIYITEGEKA Erizabeth');
  const reset = () => setMessage('BYUMVUHORE Aimable');

  return (
    <div className="app-container">
      <div className="header">
        <h1>React testing by using Jest</h1>
        <h2>{message}</h2>
        <div className="button-group">
          <button onClick={update} className="action-button">
            Change name
          </button>
          <button onClick={reset} className="action-button">
            Reset
          </button>
        </div>
      </div>
      <Login />
    </div>
  );
}

export default App;
