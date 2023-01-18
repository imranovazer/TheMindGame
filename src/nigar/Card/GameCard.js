import React from "react";
import './gamecard.css';
const GameCard =(props)=>{
    return(
    <>
    <div className="card_">
  <div className="content_">
    <div className="front_">
      <img src={require(`../Images/${props.img}`)} className="img"/>
    </div>
    <div className="back_">
      {props.description}
    </div>
  </div>
</div>

   

    </>
    )
}
export default GameCard;