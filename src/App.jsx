import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

import "./style.css";
import Login from "./components/Authorization/Login";
import SignUp from "./components/Registration/SignUp";
import TheftMessage from "./components/TheftMessage/TheftMessage";
import StolenBikes from "./components/StolenBikes/StolenBikes";


function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component ={SignUp} />
                    <Route path="/theft-message" component={TheftMessage} />
                    <Route
                        path="/stolen-bikes"
                        component={StolenBikes}
                        exact={true}
                    />
                    <Route path="/" component={Main} />
                    <Route path="*" render={() => <Main />} />


                </Switch>
                <Footer />
            </div>
        </Router>
    );
}
export default App;
