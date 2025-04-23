import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        adminName: '',  // Changed from 'name' to 'adminName' to match backend
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            console.log('Attempting to register with:', formData);

            const response = await axios.post(
                'http://localhost:5000/api/admin/register',
                {
                    name: formData.adminName,  // Changed to match backend expectation
                    email: formData.email,
                    password: formData.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Registration successful:', response.data);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            console.log('Error details:', {
                message: err.message,
                response: err.response?.data,  // Log the actual error message from backend
                status: err.response?.status
            });
            
            // Better error handling to show validation errors
            if (err.response?.data?.errors) {
                const errorMessages = err.response.data.errors.map(e => e.msg).join(', ');
                setError(errorMessages);
            } else {
                setError(err.response?.data?.error || 'Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1 className="auth-title">Rephone</h1>
                <h2 className="auth-subtitle">Admin | Sign Up</h2>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.adminName}  // Changed from name to adminName
                            onChange={(e) => setFormData({...formData, adminName: e.target.value})}
                            required
                            className="auth-input"
                            minLength="3"  // Add validation
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                            className="auth-input"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"  // Add email validation
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                            className="auth-input"
                            minLength="6"  // Add validation
                        />
                    </div>
                    <button type="submit" className="auth-button">
                        Sign Up
                    </button>
                </form>
                <div className="auth-link">
                    Already have an account? <Link to="/login">Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;