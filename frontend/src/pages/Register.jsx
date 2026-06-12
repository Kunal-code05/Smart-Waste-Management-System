import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'CITIZEN' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useContext(AuthContext);  // getting register function from Auth
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }; // runs when user type 

  const handleSubmit = async (e) => {
    e.preventDefault();     // stop page refresh
    try {
      await register(formData); //  Calls AuthContext register function.
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        if (typeof err.response.data === 'string') {
          setError(err.response.data);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError('An error occurred during registration');
        }
      } else if (err.message === 'Network Error') {
        setError('Network Error: Make sure backend is running.');
      } else {
        setError('An error occurred during registration');
      }
    }
  };

  return (
    <div className="page-wrapper animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-dark)' }}>Create an Account</h2>
        {error && <div style={{ color: 'var(--error-color)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        {success && <div style={{ color: 'var(--success-color)', marginBottom: '1rem', textAlign: 'center' }}>{success}</div>}
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
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email" 
              className="form-input" 
              value={formData.email} 
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
          <div className="form-group">
            <label className="form-label">Role</label>
            <select name="role" className="form-input" value={formData.role} onChange={handleChange}>
              <option value="CITIZEN">Citizen</option>
              <option value="STAFF">Waste Collection Staff</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Register
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
