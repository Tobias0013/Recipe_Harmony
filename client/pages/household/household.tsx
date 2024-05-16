import React from "react";
import Household from "../../component/household/household";
import AccessDenied from "../../component/access_denied/access_denied";

const HouseHoldPage: React.FC = () => {
    const jwtExists = sessionStorage.getItem("jwt");
    if(!jwtExists){
        return (
            <AccessDenied 
                redirectTo = "/login"
                reason = "Must be logged in to view household"
            />
        )
    }else{
        return (
            <div>
                <Household />
            </div>
        );
    }
    
}
export default HouseHoldPage;