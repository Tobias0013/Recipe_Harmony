import React from 'react';
import { Link } from 'react-router-dom'; 
import './error.css'; 
const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-heading">404 - Page Not Found</h1>
            <p className="not-found-message">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <p className="not-found-message">Go back to <Link to="/">Home</Link>.</p>
        </div>
    );
};

export default NotFoundPage;
