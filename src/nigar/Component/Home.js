import React from "react";
import '../Css/Home.css';
import data from "../Card/Gamedata"
import GameCard from "../Card/GameCard";
import { Link } from 'react-router-dom';
import cardset from '../Images/cardset.png';
import List from './List';
import About from "./About";
import { useIsAuthenticated } from 'react-auth-kit';

const Home = () => {
    const isAuthenticated = useIsAuthenticated();
    const cards = data.map(item => {
        return (
            <GameCard
                key={item.id}
                {...item}
            />
        )
    })
    return (

        <div className="Home">
            <List />
            <div className="info">
                <img src={cardset} alt="cardset" />
                <h1>Players compete as a team.
                    Each player receives one card in the first round (level1), two cards in the second round (level2), and so on.
                    Complete all levels by placing cards in ascending order without losing all your lives.</h1></div>
            <section className="gamecards-list">
                {cards}
            </section>
            <h1>Team members</h1>
            <About />

            <footer class="footer">
                <div className="buttons">
                    <Link to="/Lobbies"  >
                        <button className="button">PLAY NOW </button></Link>
                </div>
            </footer>
        </div>
    )
}
export default Home;