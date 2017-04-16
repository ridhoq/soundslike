import "./scss/styles.scss"
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, withRouter} from "react-router-dom";
import localforage from "localforage";
import createHistory from 'history/createBrowserHistory';

import App from "./containers/app"
import Home from "./containers/home"
import LogInFormContainer from "./containers/login"
import SongSingleContainer from './containers/songs/single'
import AuthHelper from "./utils/authhelper"

const mount = document.createElement("div");
const authHelper = new AuthHelper(localforage.createInstance({name: "soundslike"}));
const history = createHistory();

const Index = () => (
    <Router history={history}>
        <App authHelper={authHelper}>
            <Route exact path="/" component={Home}/>
            <Route path="/login" render={() => <LogInFormContainer authHelper={authHelper}/>}/>
            <Route path="/songs/:songId" component={SongSingleContainer}/>
        </App>
    </Router>
);

ReactDOM.render(<Index/>, mount);

document.body.appendChild(mount);
