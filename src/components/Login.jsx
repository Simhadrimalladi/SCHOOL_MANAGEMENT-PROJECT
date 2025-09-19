import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService'; // ✅ correct path to services
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('principal');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const res = await login({ email, password, role });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', role);
      alert('Login successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed: ' + (error.response?.data?.message || 'Invalid credentials'));
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="principal">Principal</option>
          <option value="teacher">Teacher</option>
        </select>
        <button type="submit">Login</button>
        <div className="form-footer">
          <p><a href="#">Forgot Password?</a></p>
          <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
