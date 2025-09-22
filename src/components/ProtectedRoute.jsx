// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // If no user, redirect to the login page
        return <Navigate to="/login" />;
    }

    return children; // If user exists, render the child component
};

export default ProtectedRoute;