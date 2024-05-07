import React from "react";
import SignUpForm from "../../component/sign_up_form/sign_up"; 
import AccessDenied from "../../component/access_denied/access_denied";

const SignUpPage: React.FC = () => {
    const jwtExists = sessionStorage.getItem("jwt");
    if(jwtExists){
        return (
            <AccessDenied 
                redirectTo="/"
                reason="You Are Already Logged In"
            />
        )
    }else{
        return (
            <div>
                <SignUpForm />
            </div>
        );
    }
};

export default SignUpPage;
