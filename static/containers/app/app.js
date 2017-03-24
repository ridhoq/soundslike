import React, {Component} from "react";

export class AppHeader extends Component {
    render() {
        return (
            <nav className="navbar navbar-inverse bg-primary">
                <a className="navbar-brand" href="#">soundslike</a>
            </nav>
        );
    }
}

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <AppHeader/>
                {this.props.children}
            </div>
        );
    }
}