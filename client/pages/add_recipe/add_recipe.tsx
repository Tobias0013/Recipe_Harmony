import React from "react";
import AddRecipeForm from "../../component/add_recipe_form/add_form";
import AccessDenied from "../../component/access_denied/access_denied";

const SignUpPage: React.FC = () => {
    const jwtExists = sessionStorage.getItem("jwt");
    if(!jwtExists){
        return (
            <AccessDenied 
                redirectTo = "/login"
                reason = "Must be logged in to add recipes"
                redirectTimer={3}
            />
        )
    }else{
        return (
            <div>
                <AddRecipeForm />
            </div>
        );
    }
};

export default SignUpPage;
