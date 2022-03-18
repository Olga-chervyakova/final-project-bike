import React from "react";
import { NavLink } from "react-router-dom";

import './Header.css';
import bicycle from "../../img/bicyclenew3.png"

const Header = () => {
    let isAuth = false;
    if (localStorage.getItem("bikeTheftAuthorization") !== null) {
        //isAuth = localStorage.getItem("bikeTheftAuthorization").isAuth;
    }
    const onExitButtonClicked = () => {
        localStorage.removeItem("bikeTheftAuthorization");
        window.location.reload(false);
    };

    return (
        <>
            <div className="header">
                <div className="container">
                    <div className="header-container">
                        <div className="bicycle-logo">
                            <img src={bicycle} alt="bicycle"/>
                        </div>
                        <h1 className="header-container_logo">Bicycle Search Service</h1>
                        <div className="header-container_info">
                            <ul>
                                <div className="header-block">
                                    <NavLink
                                        to="/theft-message"
                                        className="link"
                                        activeClassName="active"
                                    >
                                        Новый случай
                                    </NavLink>

                                    <NavLink
                                        to="/stolen-bikes"
                                        className="link"
                                        activeClassName="active"
                                    >
                                        Украденные велосипеды
                                    </NavLink>
                                    <NavLink
                                        to="/officers"
                                        className="link"
                                        activeClassName="active"
                                    >
                                        Ответственные сотрудники
                                    </NavLink>
                                </div>
                                <>
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
                                    <li>
                                        <button className="btn btn-logout" onClick={onExitButtonClicked}>Log out</button>
                                    </li>
                                </>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Header;