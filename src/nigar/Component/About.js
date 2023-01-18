import React from "react";
import Card from "../Card/Card"
import data from "../Card/Aboutdata"


const About =()=>{
    const cards = data.map(item => {
        return (
            <Card
                key={item.id}
                {...item}
            />
        )
    }) 
    return(
    <>
    <section className="cards-list">
                {cards}
            </section>
    
    </>
    )
}
export default About;