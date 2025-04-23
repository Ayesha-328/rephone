import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await api.post('/login', 
        { email, password },
        { 
          withCredentials: true,  // This is crucial for cookies
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Login response:', response.data);

      if (response.data) {
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Rephone</h1>
        <h2 className="auth-subtitle">Admin Sign In</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>
        <div className="auth-link">
          Need an account? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;