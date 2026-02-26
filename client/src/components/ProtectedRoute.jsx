import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="h-screen flex items-center justify-center bg-slate-50 text-slate-400">Loading session...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
