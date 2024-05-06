import React from "react";
import "./login.css"; 

const LoginForm: React.FC = () => {
    return (
        <div className="login-form">
            <form>
                <input type="text" placeholder="Email" className="input-field" />
                <input type="password" placeholder="Password" className="input-field" />
                <button type="submit" className="submit-button">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup">Sign up here</a></p>
        </div>
    );
};

export default LoginForm;
