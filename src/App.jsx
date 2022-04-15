import React from "react";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header/Header";

import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./style.css";
import Login from "./components/Authorization/Login";
import SignUp from "./components/Registration/SignUp";
import Report from "./components/Report/Report";
import DetailBike from "./components/DetailBike/DetailBike";
import StolenBikes from "./components/StolenBikes/StolenBikes";
import Officers from "./components/Officers/Officers";
import OfficerList from "./components/OfficerList/OfficerList";

function App () {


    return (
        <Router>
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component ={SignUp} />
                    <Route path="/officers" component={Officers} />
                    <Route path = "/officerList" component={OfficerList}/>
                    <Report path="/theft-message" component={Report} />
                    <Route path = "/detail-bike" component={DetailBike}/>
                    <Route path="/stolen-bikes" component={StolenBikes} />
                    <Route path="/" component={Main} />
                    <Route path="*" render={() => <Main />} />
                    <Route path="*" render={() => <div>404 NOT FOUND</div>} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}
export default App;
