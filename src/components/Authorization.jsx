import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { Route, Routes, useLocation ,useNavigate} from "react-router-dom";
import {useIsAuthenticated} from 'react-auth-kit';

const Authorization = () => {
  const isAuthenticated = useIsAuthenticated()
  const value = useLocation();
  const navigate = useNavigate();

  React.useEffect(()=>{
    if(isAuthenticated())
    {
      navigate('/') ;
    }
  },[])


  return (
    <div className="Authorzization">
      <div className="Log">
          <Routes>
            <Route path="Login" element={<Login />} />
            <Route path="Signup" element={<SignUp />} />
          </Routes>
      </div>
      {/* <div className="rabitImage">
        { <img src={Rabbit} alt="" srcset="" /> }
      </div> */}
      {/* <div className={value.pathname === "/Aut/Signup" ? "Sig" : "Sig zero"}>
        {value.pathname === "/Aut/Signup" && (
          <Routes>
            <Route path="Login" element={<Login />} />
            <Route path="Signup" element={<SignUp />} />
          </Routes>
        )}
      </div> */}
    </div>
  );
};
export default Authorization;
