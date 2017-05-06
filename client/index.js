import "./scss/styles.scss"
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import localforage from "localforage";
import createHistory from 'history/createBrowserHistory';
import {Provider} from "react-redux";
import {createStore} from "redux";
import throttle from "lodash/throttle";

import App from "./containers/app";
import Home from "./containers/home";
import LogInFormContainer from "./containers/login";
import SongSingleContainer from './containers/songs/single';
import {loadState, saveState} from "./utils/localstorage";
import soundsLikeReducer from "./reducers";

const mount = document.createElement("div");
const localForageInstance = localforage.createInstance({name: "soundslike"});
const persistedState = loadState(localForageInstance);
const store = createStore(soundsLikeReducer, persistedState);
const history = createHistory();

store.subscribe(throttle(() => {
    saveState(localForageInstance, {
        auth: store.getState().auth
    });
}, 1000));

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
