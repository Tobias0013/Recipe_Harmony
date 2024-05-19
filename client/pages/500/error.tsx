import React from 'react';
const InternalErrorPage = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-heading">500 - Internal Server Error</h1>
            <p className="not-found-message">The server encountered an error and could not complete your request</p>
            <p className="not-found-message">Please try again later, and if the problem persists contact customer support!</p>
            <p></p>
        </div>
    );
};

export default InternalErrorPage;