import React from "react";
import '../styles/Card.scss'
const Card = ({color,number,id,putCard}) =>
{
    return (<div onClick={()=>putCard(number)} className="oneCard" style={{backgroundColor:`${color}`,
    transform:`translateX(-${id*20}px)`}}>
        <div className="number">
            {number}
        </div>

    </div>
    )
}
export default Card ;