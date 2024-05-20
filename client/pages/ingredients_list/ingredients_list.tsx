import React from "react";
import List from "../../component/list/list"; 
import AccessDenied from "../../component/access_denied/access_denied";

const LoginPage: React.FC = () => {
    const jwtExists = sessionStorage.getItem("jwt");
    if(!jwtExists){
        return (
            <AccessDenied 
                redirectTo = "/"
                reason = "Must Be Logged In To Access Ingredients List"
            />
        )
    }else{
        return (
            <div style={{marginBottom: "10rem"}}>
                <List listTitle="Ingredients List" shoppingList={false}/>
            </div>
        );
    }
    
};

export default LoginPage;
