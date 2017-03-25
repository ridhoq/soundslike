import "./scss/styles.scss"
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";

import App from "./containers/app/app"
import Home from "./containers/home/home"
import LoginFormContainer from "./containers/login/login"
import SongSingleContainer from './containers/songs/single'

const mount = document.createElement("div");

const Index = () => (
    <Router>
        <App>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={LoginFormContainer}/>
            <Route path="/songs/:songId" component={SongSingleContainer}/>
        </App>
    </Router>
);

ReactDOM.render(<Index/>, mount);

document.body.appendChild(mount);
