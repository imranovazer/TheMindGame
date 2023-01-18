import React from "react"
import '../styles/lobby.scss'
import Card from "./Card";
import {Link} from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useSignOut } from 'react-auth-kit'

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
};

var socket= null

 function establishSocketConnection(id,token) {
   if (id && token) {
        socket = new W3CWebSocket(`ws://127.0.0.1:8080/ws/lobby/${id}/?token=${token}`);
   }
 }

const GameRoom = () =>
{   
    
    const signOut = useSignOut() ;
    const changeReady = () =>
    //The only functio whihc trigger onmessage
    {
        socket.send(JSON.stringify({
            type: "ready",
            message: {
                isReady: "True" 
            }
        }))
    }
    const putCard = (num) =>
    //The only functio whihc trigger onmessage
    {

        socket.send(JSON.stringify({
            type: "put_card",
            message: {
                card_number: num 
            }
        }))
    }
    // window.onbeforeunload = function() {
    //     return "You are gonna be dissconnetcted from game?";
    //   };

    const data = [{color:'red',number:'12',id:0},{color:'green',number:'3',id:1},{color:'purple',number:'5',id:2},{color:'black',number:'43',id:3},{color:'blue',number:'43',id:4}]
    const [gameStarted, setGameStarted] = React.useState(false);//FIX---------------------
    const [connectedPlayers, setPlayers] = React.useState([]);
    const [gameState, setGameState] = React.useState([]); 
    const [cardsOnTheTable, setCardsOnTheTable] = React.useState();
    const [gameStatus, setGameStatus] = React.useState(null);
    const [PlayersBehindTable, setPlayersBehindTable] = React.useState([{ name: "Azer", cards: "12" }, { name: "", cards: "" }, { name: "", cards: "" }])
    
    console.log(PlayersBehindTable); 
    React.useEffect(() => {
        const queryString =  window.location.search;
        const urlParams = new URLSearchParams(queryString);
         const id =  urlParams.get('room');
        const token = getCookie("_auth");
        
        
        establishSocketConnection(id,token);
        if (socket)
        {
                
            
                
           socket.onopen = () =>
           {
               console.log("client to GameRoom connected!");
            }
            socket.onmessage = (e) => {
                    const dataFromSocket = JSON.parse(e.data);
                    
                    console.log("On  message of GameRoom");
                    //console.log(dataFromSocket) ;
                    if(dataFromSocket.type ==='connection')
                    {
                        setPlayers(dataFromSocket.message)
                    }
                    else if (dataFromSocket.action === 'show_state') {
                        setGameState(dataFromSocket.message);
                        setGameStarted(true);
                        setCardsOnTheTable(dataFromSocket.message.game_state.stack)
                        setGameStatus(dataFromSocket.message.game_state.status)
                        const array= dataFromSocket.message.number_of_cards.filter(e=>e.name!==dataFromSocket.message.username)
                        setPlayersBehindTable(array);
                        

                    }
           };
         socket.onclose = function() {
            console.log('User disconnected from waiting room');
            };
            }
            
            return () => {
               socket.close();
             };
        
    }, []);
 
    
    return (gameStarted ? <div className="Lobby">

        {gameStatus===true ||gameStatus===false ?<div className="gameEnd">
                {gameStatus===true && 
                <div className="winAlert">
                    <div className="Message">
                            Congrats you won!
                    </div>
                   <div className="backButton">
                        <Link to="/Lobbies">Go to menu</Link>
                   </div>
                    </div>}
                {gameStatus===false && 
                <div className="looseAlert">
                    <div className="Message">
                            Unfortunately you lost!
                    </div>
                   <div className="backButton">
                        <Link to="/Lobbies">Go to menu</Link>
                   </div>
                    </div>}

            
        </div>:null}
        
        <div className="bar">
            <div className="Lives">
                <i className='bx bxs-heart'></i>:{" "+  gameState.game_state.lives}
            </div>
            <div className="Level">
                <i className='bx bxs-star'></i>:{" "+  gameState.game_state.level}
            </div>
        </div>


        <div className="table">
            {PlayersBehindTable.length >=1 && <div className="playerIn fo1">
                 <div className="ava">
                 <i className='bx bx-user'></i>
                </div>
                <div className="userInfo">
                    <div className="username">
                    <i className='bx bx-user-circle'></i>:{ PlayersBehindTable[0].name}
                    </div>
                    <div className="cardnumber">
                        <i className='bx bx-memory-card'></i>:{ PlayersBehindTable[0].cards}
                    </div>
                </div>
                </div>}
            {PlayersBehindTable.length >=2 && <div className="playerIn fo2">
            <div className="ava">
                 <i className='bx bx-user'></i>
                </div>
                <div className="userInfo">
                    <div className="username">
                    <i className='bx bx-user-circle'></i>:{ PlayersBehindTable[1].name}
                    </div>
                    <div className="cardnumber">
                        <i className='bx bx-memory-card'></i>:{ PlayersBehindTable[1].cards}
                    </div>
                </div>
            </div>}
            {PlayersBehindTable.length >=3 && <div className="playerIn fo3">
            <div className="ava">
                 <i className='bx bx-user'></i>
                </div>
                <div className="userInfo">
                    <div className="username">
                    <i className='bx bx-user-circle'></i>:{ PlayersBehindTable[2].name}
                    </div>
                    <div className="cardnumber">
                        <i className='bx bx-memory-card'></i>:{ PlayersBehindTable[2].cards}
                    </div>
                </div>
            </div>}
            <div className="cardsPlaceholder">
                {
                    cardsOnTheTable && cardsOnTheTable!==0 ? <Card color='black' number={cardsOnTheTable} putCard={ null} />:null
                }
                
            </div>
        </div>
        <div className="myCards">
            <div className="container">{gameState.cards.map((item, i) => <Card putCard={putCard} key={ i} color="black" id={i} number={item}/>)}</div>
           
        </div>
    </div> :
        <div className="Wait">
            {
                connectedPlayers.map((e,i) => e.username?<div key={i} className="personBox">
                    <div className="personAva">

                        {e.isReady ? <div className="alert ready">
                            Ready
                        </div> : <div className="alert notready">
                            Waiting..
                        </div>}

                    </div>
                    <div className="personName">
                        {e.username}
                    </div>
                </div>:<div className="personBox"  key={i}>
                    <div className="personAvanimate">

                    </div>
                    <div className="personName">
                        <div className="loadingName">

                        </div>
                        
                    </div>
                </div>)
            }

            <div className="readyLeave">
                <Link to="/Lobbies" className="click leaveBut">Leave</Link>
                {/* <button className="click leaveBut">Leave</button> */}
                <button className="click readyBut" onClick={changeReady}>Ready</button>
            </div>

            
        </div>)
}
export default GameRoom  ;