import React from "react";
import ReactDOM from "react-dom";
import SongSingleContainer from "./containers/songs/single";

const mount = document.createElement("div");

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/songs/:songId" component={SongSingleContainer}/>
        </div>
    </Router>
)

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
)

ReactDOM.render(<App/>, mount);

document.body.appendChild(mount);
