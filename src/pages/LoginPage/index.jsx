/* eslint-disable */
import React from "react";
import "./LoginPage.css";
import makeRequest from "../../utils/makeRequest";
import { loginUser, createUser } from "../../constants/authEndpoints";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../../constants/authEndpoints";
export default function LoginPage() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [login, setLogin] = React.useState(true);
    const navigate = useNavigate();
    const handleChangeUsername = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleLogin = async () => {
        try{
            if(login){
                const result=await makeRequest(loginUser,BASE_URL, {data:{ email, password } });
                localStorage.setItem("token", result.token);
                if(result.success){
                    navigate("/home");
                }
            }
            else{
                const result=await makeRequest(createUser, {data:{ email, password } });
                console.log(result)
                if(result.success){
                    alert("User created successfully");
                    window.location.reload();
                }
            }
        }
        catch(err){
            console.log(err);
        }
    }
    
    return (
        <div className="LoginPage">
            <div className="login-card">
                <h1>Design API's Fast,<br></br>Manage Content Easily</h1>
                <img src={require("../../assets/images/loginImage.png")} alt="login-Image" />
            </div>
            <div className="login-form">
                <div>
                    <h1>{login?"Login":"Register"} to your CMS+ account</h1>
                </div>
                <div className="form">
                    <div className="email-section">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" onChange={handleChangeUsername}/>
                    </div>
                    <div className="password-section">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={handleChangePassword} />
                    </div>
                    <button onClick={handleLogin}>{login?"Login":"Register"}</button>
                    <a href="#"><u>Forgot Password?</u></a>
                    <a style={{cursor:"pointer"}} onClick={()=>setLogin(!login)}><u>{login?"Don't have an account?":"go to login"}</u></a>
                </div>
            </div>
        </div>
    );
}