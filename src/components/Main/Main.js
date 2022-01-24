import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import './Main.css';




const Main = () => {

    return (
        <div className="main-container">
            <div className="main-content_container">
                <p>Прокат велосипедов</p>
                <NavLink to="/theft-message">
                    <button className="btn btn-message">Сообщите о краже!</button>
                </NavLink>
            </div>
        </div>
    );
};
export default Main;