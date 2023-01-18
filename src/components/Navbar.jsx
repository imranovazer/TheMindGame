import React from "react"
import '../styles/Navbar.scss'
import { useLocation, Link } from "react-router-dom"
import { useSignOut,useIsAuthenticated } from 'react-auth-kit'

const Navbar = () => {
    const link = useLocation();
    const paths = ['/','/Lobbies',]
    const signOut = useSignOut()
    const isAuthenticated = useIsAuthenticated()
    const [isDisplayed, setDisplayed] = React.useState(false);

    
    return (paths.includes(link.pathname)  &&<div className="Navbar">
        <div className="Logo">
            <Link to='/'>
                The Mind
            </Link>
            <Link to='/Lobbies' >
                Lobbies
            </Link>
        </div>
        {isAuthenticated()?<div className="acaunt">
            <div className="avatar" onClick={() => setDisplayed((prev) =>!prev)}>
            </div>
        </div> : <Link className="LogInButton" to="/Aut/Login">
            <i class='bx bx-log-in'></i>
        
        </Link>}
        
        {
            isDisplayed && <div className="Settings">
                <div className="log-out" onClick={() => {
                    setDisplayed(false);
                    signOut()
                }}>Log out</div>
            </div>
        }
        
            
        
        
        
    </div>)
}
export default Navbar ;