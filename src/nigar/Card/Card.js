import React from "react";
import './card.css';

const Card =(props)=>{
    return(
    <>
    
    <div className="card">
  <div className="content">
    <div className="front">
      {props.name}
    </div>
    <div className="back">
      {props.description}
    </div>
  </div>
</div>

   

    </>
    )
}
export default Card;