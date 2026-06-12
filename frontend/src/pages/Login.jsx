
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext); // get login function from AuthContext
  const navigate = useNavigate(); // move user to another page

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }; // run when user type

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password); // Calls AuthContext login function.
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="page-wrapper animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-dark)' }}>Welcome Back</h2>
        {error && <div style={{ color: 'var(--error-color)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              name="username" 
              className="form-input" 
              value={formData.username} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name="password" 
              className="form-input" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Login
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
