import React from "react";
import {
    Route,
    Link
} from "react-router-dom"

import {App} from "./containers/app/app"
import {Home} from "./containers/home/home"
import {SongSingleContainer} from './containers/songs/single'


const Routes = (
    <Route path="/home" component={Home}/>
);

export default Routes;
