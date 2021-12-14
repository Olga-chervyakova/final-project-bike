
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import "./style.css";


function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="Main">
                    <div className="Container">

                <Switch>

                </Switch>
                    </div>
                </div>

                <Footer />
            </div>
        </Router>
    );
}

export default App;