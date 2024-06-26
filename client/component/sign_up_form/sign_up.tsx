import React, {useState, useEffect} from "react";
import "./sign_up.css"; 
import { useNavigate } from "react-router-dom";
import fetchUsers from "../../controller/fetch/users";

const sign_up_form: React.FC = () => {
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
    const nav = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            
            const response: Response = await fetchUsers.user.signup(fullName, password, email);

            if(response.status === 201){
                nav("/login");
            }else if(response.status === 400){
                setError("All fields must be filled in");
            }else if(response.status === 409){
                setError("Email already in use");
            }else{
                window.location.href = "/500";
            }
        
        }catch(err){
            console.log(err);
            window.location.href = "/500";
        }
    }

    useEffect(() => {
        if(confirmPassword !== password){
            setError("Passwords not matching");
            setIsSubmitDisabled(true);
        }else{
            setError("");
            setIsSubmitDisabled(false);
        }
    }, [confirmPassword, password])

    return (
        <div className="signup-form">
            <p className="error-msg">{error}</p>
            <form onSubmit={handleSubmit} className="sign-up-form">
                <input type="text" placeholder="Full Name" className="input-field" onChange={(e) => setFullName(e.target.value)}/>
                <input type="text" placeholder="Email" className="input-field" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" className="input-field" onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Re-enter password" className="input-field" onChange={(e) => setConfirmPassword(e.target.value)}/>
                <button type="submit" className="submit-button" disabled={isSubmitDisabled}>Sign Up</button>
            </form>
            <p className="login-msg">Already have an account? <a href="/login" className = "login-link">Login here</a></p>
        </div>
    );
};

export default sign_up_form;
