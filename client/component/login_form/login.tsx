import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userAPI from "../../controller/fetch/users";
import "./login.css"; 

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const nav = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const response: Response = await userAPI.user.login(email, password);

            if(response.status === 200){
                const data = await response.json();
                const jwt = data.jwt;
                sessionStorage.setItem("jwt", jwt)

                const userId = JSON.parse(atob(jwt.split(".")[1])).user_id;

                const { error, favorite_recipes } = await userAPI.getRecipes(userId, jwt)
                if (error) {
                    alert("Error\nCould not load favorite recipes\n" + error.Error)
                }
                else {
                    sessionStorage.setItem("favorites", JSON.stringify(favorite_recipes));
                }
                nav("/")
            }
            else if(response.status === 400){
                setError("All fields must be filled in");
            }
            else if(response.status === 401){
                setError("Email or password incorrect")
            }
            else{
                window.location.href = "/500";
            }

        }
        catch(err){
            console.log(err);
            window.location.href = "/500";
        }
    }

    return (
        <div className="login-form">
            <p className="error-msg">{error}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" className="input-field" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="input-field" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="submit-button">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup" className="signup-link">Sign up here</a></p>
        </div>
    );
};

export default LoginForm;
