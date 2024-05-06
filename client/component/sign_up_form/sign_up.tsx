import React, {useState} from "react";
import "./sign_up.css"; 
import { useNavigate } from "react-router-dom";
const sign_up_form: React.FC = () => {
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const nav = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const response = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    full_name: fullName,
                    password: password,
                    email: email
                })
            });

            if(response.status === 201){
                nav("/login");
            }else if(response.status === 400){
                setError("All fields must be filled in");
            }else if(response.status === 409){
                setError("Email already in use");
            }else{
                setError("Internal Server Error")
            }
        
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="signup-form">
            <p className="error-msg">{error}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Full Name" className="input-field" onChange={(e) => setFullName(e.target.value)}/>
                <input type="text" placeholder="Email" className="input-field" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" className="input-field" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="submit-button">Sign Up</button>
            </form>
            <p className="login-msg">Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
};

export default sign_up_form;
