import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      setToken(response.data.token);
      setMessage('Login successful');
      toast.success('Login successful!');
    } catch (error) {
      setMessage('Login failed');
      toast.error('Login failed: Invalid credentials');
    }
  };

  const handleSecureRequest = async () => {
    try {
      const response = await axios.get('http://localhost:5000/secure', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      setMessage('Failed to access secure route');
      toast.error('Failed to access secure route');
    }
  };

  return (
    <div className="App">
      <h1>JWT Authentication</h1>
      <ToastContainer />
      {!token ? (
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <>
          <button onClick={handleSecureRequest}>Access Secure Route</button>
          <p>{message}</p>
        </>
      )}
    </div>
  );
}

export default App;
