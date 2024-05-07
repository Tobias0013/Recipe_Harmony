import React, { useEffect, useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

interface AccessDeniedProps {
    redirectTo?: string,
    reason?: string
}

export default function AccessDenied<AccessDeniedProps>({ redirectTo="/", reason="ACCESS DENIED"}) {
    const nav: NavigateFunction = useNavigate();
    const [counter, setCounter] = useState<number>(3);

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
        <>
            <p>
                {reason}
            </p>
            <p>
                You Will Be Redirected In {counter} Seconds
            </p>
        </>
    );
}
