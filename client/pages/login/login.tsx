import React from "react";
import LoginForm from "../../component/login_form/login"; 
import AccessDenied from "../../component/access_denied/access_denied";

const LoginPage: React.FC = () => {
    const jwtExists = sessionStorage.getItem("jwt");
    if(jwtExists){
        return (
            <AccessDenied 
                redirectTo = "/"
                reason = "You Are Already Logged In"
            />
        )
    }else{
        return (
            <div>
                <LoginForm />
            </div>
        );
    }
    
};

export default LoginPage;
