import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default ProtectedRoute = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            navigate('/');
        }
    }
    , []);
    return (
        <div>
            {isAuthenticated && children}
        </div>
    );
};