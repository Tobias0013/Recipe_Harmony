import React, { useEffect, useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import "./access_denied.css";

interface AccessDeniedProps {
    redirectTo?: string,
    reason?: string
}

export default function AccessDenied<AccessDeniedProps>({ redirectTo="/", reason="ACCESS DENIED", redirectTimer=3}) {
    const nav: NavigateFunction = useNavigate();
    const [counter, setCounter] = useState<number>(redirectTimer);

    useEffect(() => {
        setTimeout(() => {
            if(counter === 0){
                nav(redirectTo);
            }else{
                setCounter(counter-1);
            }
        }, 1000)
    }, [counter])


    return (
        <div className="access-denied-wrapper">
            <p className="access-denied-text">Access Denied</p>
            <p className="access-denied-text">
                {reason}
            </p>
            <p className="access-denied-text">
                You Will Be Redirected In {counter} Seconds
            </p>
        </div>
    );
}
