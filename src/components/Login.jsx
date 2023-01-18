import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.scss";
import Rabbgit from '../images/Rablit.png'
import axios from "axios";
import { useSignIn } from 'react-auth-kit'

const Login = () => {
  const [login, setLogin] = React.useState();
   const signIn = useSignIn()
  const [password, setPassword] = React.useState();
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const changeLink = () => {
    setLoading(true);
    setTimeout(() => navigate("/Aut/Signup"), 1000);
  };
  const onSubmit = (e) => {
    const formData = { username: login, password }; 
        e.preventDefault()
        axios.post('http://localhost:8080/auth/login/', formData)
            .then((res)=>{
                if(res.status === 200){
                     if(signIn(
                         {
                             token: res.data.access,
                             expiresIn:3600 ,
                             tokenType: "Bearer",
                              refreshToken: res.data.refresh  ,
                             refreshTokenExpireIn:7200 ,
                             authState:{username:login, token:res.data.access,refresh:res.data.refresh} ,
                         }
                     )) {  
                       setError(null)
                      console.log("Logged in successfully") ;
                          navigate("/") ;

                     }else {
                         
                     }
                  
                }
            }).catch((err) =>
            {
                setError("Login or password is wrong. Try again")
            })
  }
 
  
  

  return (
    <div className="Login">
      {isLoading ? (
        <div className="Loading">
            <div className="left">
              <img src={Rabbgit} alt="" srcset="" />
            </div>
            <div className="right">
              <img src={Rabbgit} alt="" srcset="" />
            </div>
            <div className="text_load">
              
            </div>
          </div>
      ) : (
          <div className="beloweAboveContainer">
            <div className="abovePart">
              <div className="welcome">
            Hello!
            <br />
            <span>Let's play</span>
            </div>

          <div className="login">
            <div className="text">
              <span>Login</span>&nbsp;your account
            </div>
              {error && <div className="Error">
                {error}
              </div>}
            <input type="text" placeholder="username" onChange={(event)=>setLogin(event.target.value)}/>
            <input type="password" placeholder="password" onChange={(event)=>setPassword(event.target.value)}/>
          </div>

            </div>
            <div className="belovePart">
              <div className="buttonL">
                <div className="log_in" onClick={onSubmit}>Log in</div>
                </div>
                <div className="createAc">
                  <span>
                    <div className="linkButt" onClick={changeLink}>
                      Create Account
                    </div>
                  </span>
                </div>
            </div>
          

          
        </div>
      )}
    </div>
  );
};
export default Login;
