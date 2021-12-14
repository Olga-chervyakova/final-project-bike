import React from "react";
import {  NavLink } from "react-router-dom";

import './Header.css';
import bicycle from "../../img/bicycle.svg"

const Header = () => {
    return (
        <>
            <div className="header">
                <div className="header-container">
                    <div className="bicycle-logo">
                        <img src={bicycle} alt="bicycle" />
                    </div>
                <h1 className="header-container_logo"><NavLink to="/">BICYCLE</NavLink></h1>
                <div className="header-container_info">
                    <ul>
                        <NavLink to="/login">
                            <li>
                                <button className="btn btn-login">Log in</button>
                            </li>
                        </NavLink>
                        <NavLink to="/signup">
                            <li>
                                <button className="btn btn-signup">Sign up</button>
                            </li>
                        </NavLink>
                    </ul>
                </div>
                </div>
            </div>
        </>
    );
};
export default Header;