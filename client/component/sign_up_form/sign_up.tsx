import React from "react";
import "./sign_up.css"; 

const sign_up_form: React.FC = () => {
    return (
        <div className="signup-form">
            <form>
                <input type="text" placeholder="Full Name" className="input-field" />
                <input type="text" placeholder="Email" className="input-field" />
                <input type="password" placeholder="Password" className="input-field" />
                <input type="retype_password" placeholder="Re-enter password" className="input-field" />
                <button type="submit" className="submit-button">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
};

export default sign_up_form;
