import React from "react";
import List from "../../component/list/list"; 
import AccessDenied from "../../component/access_denied/access_denied";

const LoginPage: React.FC = () => {
    const jwtExists = sessionStorage.getItem("jwt");
    if(!jwtExists){
        return (
            <AccessDenied 
                redirectTo = "/"
                reason = "Must Be Logged In To Access Shopping List"
            />
        )
    }else{
        return (
            <div style={{marginBottom: "10rem"}}>
                <List listTitle="Shopping List" shoppingList={true}/>
            </div>
        );
    }
    
};

export default LoginPage;
