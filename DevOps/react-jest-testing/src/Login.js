import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({});

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/users');
      const user = response.data.find(
        (user) => user.username === username && user.password === password
      );
  
      if (user) {
        setData(user);
        setError('');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Failed to login');
    } finally {
      setLoading(false);
    }
  };

  // const createUser = async (username, password, name) => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/users', {
  //       username,
  //       password,
  //       name,
  //     });
  //     console.log('User created successfully:', response.data);
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //   }
  // };
  
  // createUser('newuser', 'newpassword123', 'New User');

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login Form</h1>
        {loading ? <h2>Loading...</h2> : ''}
        {data && <h2>Welcome, {data.username || 'User'}!</h2>}
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button onClick={handleLogin} disabled={!username || !password} className="login-button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
