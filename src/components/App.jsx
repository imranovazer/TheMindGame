import React from "react";
import "../styles/App.scss";
import Authorization from "../components/Authorization";

import { AuthProvider,RequireAuth } from 'react-auth-kit'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../nigar/Component/Home';
import Navbar from "./Navbar";
import GameRoom from "./GameRoom";
import Lobbies from "./Lobbies";
import refreshApi from "../api";
const App = () => {
  return (
    <AuthProvider authType={'cookie'}
      authName={'_auth'}
      refresh={refreshApi}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https:"}>
      <div className="App">
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={ 

            <Home/>} />
            <Route path="/Aut/*" element={<Authorization />} />
            <Route path="/Lobbies" element={<RequireAuth loginPath={'/Aut/Login'}>
            <Lobbies/>
            </RequireAuth>} />
            <Route path="/GameRoom/*" element={   <RequireAuth loginPath={'/Aut/Login'}>
            <GameRoom/>
          </RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </div>
    </AuthProvider>
  );
};

export default App;
