import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../Images/rabbit.png";
import '../Css/List.css'
const List =()=>{
    return(
    <>
    <header>
        <div className="container container-flex">
            <div className="logoContainer">
                <img src={logo} alt="logo" className="logo"/>
            </div>
            <h1 className="name">Mind game</h1>
            <nav>
                <div className="list">
                    <NavLink exact link to="/" className="listItem" activeClassName="activeItem"></NavLink>
                </div>
            </nav>
        </div>
    </header>
    </>
    )
}
export default List;