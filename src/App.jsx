import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

import "./style.css";
import Login from "./components/Authorization/Login";
import SignUp from "./components/Registration/SignUp";



function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component ={SignUp} />
                    <Route path="/" exact component={Main} />
                    <Route path="*" render={() => <Main />} />
                </Switch>
                <Footer/>
            </div>
        </Router>
    );
}
export default App;
