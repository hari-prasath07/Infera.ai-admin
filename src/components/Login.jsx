import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import '../css/Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showForgetForm, setShowForgetForm] = useState(false); // toggle form
    const [forgetEmail, setForgetEmail] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const DEFAULT_EMAIL = 'hari@gmail.com';
    const DEFAULT_PASSWORD = 'hari123';

    useEffect(() => {
        document.body.classList.add('login-page');
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
            console.log('Login successful!');
            const userData = { email: DEFAULT_EMAIL, name: 'Admin User' };
            login(userData);
            navigate('/dashboard');
        } else {
            setError('Invalid email or password.');
        }
    };

    const handleForgetSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        if (forgetEmail === DEFAULT_EMAIL) {
            setMessage('Password reset link sent to your email!');
        } else {
            setMessage('Email not found.');
        }
    };

    return (
        <div className="login-container">
            {!showForgetForm ? (
                <form onSubmit={handleSubmit} className="login-form">
                    <h2 className="login-title">Admin Login</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="hari@gmail.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="hari123"
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">Login</button>

                    <p 
                        className="forget-link" 
                        onClick={() => setShowForgetForm(true)}
                        style={{ cursor: 'pointer', color: '#9333ea', marginTop: '10px' }}
                    >
                        Forgot Password?
                    </p>
                </form>
            ) : (
                <form onSubmit={handleForgetSubmit} className="login-form">
                    <h2 className="login-title">Reset Password</h2>
                    {message && <p style={{ color: message.includes('sent') ? 'green' : 'red' }}>{message}</p>}

                    <div className="form-group">
                        <label htmlFor="forgetEmail">Enter your email</label>
                        <input
                            type="email"
                            id="forgetEmail"
                            value={forgetEmail}
                            onChange={(e) => setForgetEmail(e.target.value)}
                            placeholder="hari@gmail.com"
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">Send Reset Link</button>

                    <p 
                        className="forget-link" 
                        onClick={() => { setShowForgetForm(false); setMessage(''); }}
                        style={{ cursor: 'pointer', color: '#9333ea', marginTop: '10px' }}
                    >
                        Back to Login
                    </p>
                </form>
            )}
        </div>
    );
};

export default Login;
