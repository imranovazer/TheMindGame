import React from "react";
import "../styles/Lobbies.scss";
import {  w3cwebsocket as W3CWebSocket } from "websocket";
import {useAuthUser} from 'react-auth-kit'
import '../styles/waitingBox.scss'
import { useSignOut } from 'react-auth-kit'

import { useNavigate } from "react-router-dom";
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
};

var client = null;
//var client = new W3CWebSocket(`ws://127.0.0.1:8080/ws/lobby/?token=${getCookie("_auth")}`);
function establishSocketConnection(token) {
   if ( token) {
        client = new W3CWebSocket(`ws://127.0.0.1:8080/ws/lobby/?token=${token}`);
   }
 }


const Lobbies = () =>
{
    const signOut = useSignOut() ;
    const navigate = useNavigate();
    const auth = useAuthUser()
    const [myLobby, setMyLobby] = React.useState(false);
    const [data, setData] = React.useState({
                lobby_name: "",
                lobby_count : ""
    });

    const [lobbies, setLobbies] = React.useState([]);
    
    const showLobbies = () =>
    //The only functio whihc trigger onmessage
    {
        client.send(JSON.stringify({
            type: "show_all",
            message: ""
        }))
        
    }
    
    const deleteLobby = (id) =>
    {
       
        client.send(JSON.stringify({
            type: "delete",
            message: {
                id 
            }
        }))

        showLobbies();
        // setTimeout(reload, 1000);
    }
    const submitHandler = (e) =>
    {
       
        client.send(JSON.stringify({
            type: "create_new",
            message: {
                lobby_name: data.lobby_name,
                lobby_count : data.lobby_count
            }
        }))
        setMyLobby(prev => !prev);

        showLobbies();
        // setTimeout(reload, 1000);
    }
    const redirectLobby = (id,count) =>
    {
        navigate(`/GameRoom/?room=${id}&count=${count}`)
        showLobbies();
    }    
    
    React.useEffect(() => {
        const token = getCookie("_auth");
        establishSocketConnection(token);
        client.onmessage = (e) => {
            const dataFromSocket = JSON.parse(e.data);
             if(dataFromSocket.type ==="show_all")
            {
                setLobbies(dataFromSocket.message);
            }
            
            console.log("On message triggered");
        };
        client.onopen = () =>
        {
            console.log("client connected!")
            showLobbies();
        }
        client.onerror = function() {
            
            window.alert('Your session is expired please log in again');
            signOut();
            
            
        };
        client.onclose = function() {
            console.log('Client disconnected from lobbies room');
        };
        // return () => {
        //     client.close();
        //   };
        
    }, []);
    
    
    return (
        <div className="Lobbies">
            
            
            <div className="settingsButtons">
                <div className="butContainer">
                    <button className="addLobb" onClick={()=>setMyLobby(prev => !prev)}>
                        <i className='bx bx-plus'></i>
                    </button>
                    <div className="tect">
                        Create Lobby
                    </div>
                </div>
                
            </div>
            <div className="container">
                <div className="LobbiesContainer">
                {
                    lobbies.map((e,i) =>
                    {
                        return (<div key={i} className="lobbieCart">
                            <div className="lobbiename">
                                Lobby name: 
                                <span>{e.name}</span>
                                Player number: 
                                <div><i className='bx bxs-user'></i> 
                                <span>{e.user_count}/{e.max_count}</span></div>
                                
                            </div>
                           
                            <div className="connContainer">
                                {e.username === auth().username &&
                                    <button className="delete" onClick={()=>deleteLobby(e.id)}>
                                        X
                                    </button>
                                }
                                <button className="connect" onClick={()=>redirectLobby(e.id,e.max_count)}>
                                    Connect
                                </button>
                            </div>
                            
                        </div>);
                        })
                }
                </div>
                {myLobby && <div className="myLobby">    
                    <div className="createMyLobby">
                        <div className="welcome">
                              <span>New Lobby :</span>  
                        </div>
                        <form  onSubmit={submitHandler}>
                            <label htmlFor="name">Lobby name: </label>
                            <input type="text" placeholder="Lobby name" id="name" onChange={(e)=>{setData({...data,lobby_name:e.target.value})}}/>
                             <label htmlFor="name">Number of players: </label>
                            <input className="num" type="number"  id="number" min="1" max={"4"}  onChange={(e)=>{setData({...data,lobby_count:e.target.value})}}/>
                            <button className="submit">
                                create
                            </button>
                        </form>
                    </div>

                </div>}
            </div>
        
            
        </div>
    )
}
export default Lobbies;