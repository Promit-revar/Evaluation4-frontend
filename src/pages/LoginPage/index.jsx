/* eslint-disable */
import React from "react";
import "./LoginPage.css";
import makeRequest from "../../utils/makeRequest";
import { loginUser } from "../../constants/authEndpoints";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleLogin = async () => {
        try{
            const result=await makeRequest(loginUser, {data:{ username, password } });
            localStorage.setItem("token", result.token);
            if(result.success){
                navigate("/home");
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <div className="LoginPage">
        <h1>Login Page</h1>
        <input type="text" placeholder="Username" onChange={handleChangeUsername}/>
        <input type="password" placeholder="Password" onChange={handleChangePassword} />
        <button onClick={handleLogin}>Login</button>
        </div>
    );
}