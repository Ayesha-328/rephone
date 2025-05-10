import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSellerAuth } from '../context/SellerAuthContext';

const SellerLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, seller, loading } = useSellerAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (seller && !loading) {
            navigate('/seller/home');
        }
    }, [seller, loading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            await login(email, password);
            // Login success - navigation will happen via the useEffect
        } catch (err) {
            let errorMessage = err.message || 'Invalid email or password';
            
            // Show a more user-friendly message if they're not a seller
            if (errorMessage.includes('user is not a seller')) {
                errorMessage = 'This account exists but is not registered as a seller. Please register as a seller first.';
            }
            
            setError(errorMessage);
            setIsLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="auth-container">
                <div className="auth-box">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1 className="auth-title"><b>Rephone</b></h1>
                <h2 className="auth-subtitle">Seller | Sign In</h2>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="auth-input"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="auth-input"
                            disabled={isLoading}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <div className="auth-link">
                    Don't have an account? <Link to="/seller/register">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default SellerLoginPage;