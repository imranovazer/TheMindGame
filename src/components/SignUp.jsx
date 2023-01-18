import React from "react";
import "../styles/Signup.scss";
import Rabbgit from '../images/Rablit.png'
import {  useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const [isClickable, setClickable] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [nickname, setNick] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rpassword, setRpassword] = React.useState("");
  React.useEffect(() =>
  {
    if (password == rpassword && password!=""&&rpassword.length>=8)
    {
      setClickable(true);
    }
    else
    {
      setClickable(false);
      }
  },[rpassword,password])
  
  const changeLink = () => {
    setLoading(true);
    setTimeout(() => navigate("/Aut/Login"), 1000);
  };
  const onSubmit = (e) => {
      const formData = {  email : mail,username:nickname, password };
        e.preventDefault()
        axios.post('http://localhost:8080/auth/register/', formData)
            .then((res)=>{
                if(res.status === 200){
                  
                  window.alert('Youregistered succesffully please log in');
                  navigate("/Aut/Login");
                    
                }
            })
    }

  return (
    <div className="SignUp">
      {isLoading ? (
        <div className="Loading">
            <div className="left"><img src={Rabbgit} alt="" srcset="" /></div>
            <div className="right"><img src={Rabbgit} alt="" srcset="" /></div>
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

          <div className="signup">
            <div className="text">
              <span>Create</span>&nbsp;your account
            </div>
            <input type="text" placeholder="nickname" onChange={(e)=>setNick(e.target.value)}/>

            <input type="text" placeholder="mail" onChange={(e)=>setMail(e.target.value)}/>
            <input type="password" placeholder="password"  onChange={(e)=>setPassword(e.target.value)}/>
            <input type="password" placeholder="repeat password" onChange={(e)=>setRpassword (e.target.value)}/>
          </div>
            </div>
          
          <div className="belowPart">
          <div className={isClickable?"s_button":"nelza"}>
            <div className="sign_in" onClick={isClickable ? onSubmit:undefined}>Create</div>
            </div>
            

            <div className="createAc">
                <span>
                  <div className="linkButt" onClick={changeLink}>
                    Log in
                  </div>
                </span>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SignUp;
