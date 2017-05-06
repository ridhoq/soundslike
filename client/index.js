import "./scss/styles.scss"
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import localforage from "localforage";
import createHistory from 'history/createBrowserHistory';
import {Provider} from "react-redux";
import {createStore, compose} from "redux";
import {persistStore, autoRehydrate} from "redux-persist";

import App from "./containers/app";
import Home from "./containers/home";
import LogInFormContainer from "./containers/login";
import SongSingleContainer from './containers/songs/single';
import soundsLikeReducer from "./reducers";

const mount = document.createElement("div");

const store = createStore(
    soundsLikeReducer,
    undefined,
    compose(
        autoRehydrate()
    )
);
persistStore(store, {
    whitelist: ['auth'],
    storage: localforage,
    keyPrefix: "soundslike-"
});

const history = createHistory();

const Index = () => (
    <Provider store={store}>
        <Router history={history}>
            <App>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={LogInFormContainer}/>
                <Route path="/songs/:songId" component={SongSingleContainer}/>
            </App>
        </Router>
    </Provider>
);

ReactDOM.render(<Index/>, mount);

document.body.appendChild(mount);
