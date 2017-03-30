import React, {Component} from "react";
import {Link} from "react-router-dom";

export class AppHeader extends Component {
    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary main-nav">
                <div className="container">
                    <ul className="nav navbar-nav flex-grow">
                        <Link to="/" className="navbar-brand">soundslike</Link>
                    </ul>
                    <ul className="nav navbar-nav flex-grow justify-content-center">
                        <form className="form-inline">
                            <input className="form-control" type="text" placeholder="Search"/>
                        </form>
                    </ul>
                    <ul className="nav navbar-nav flex-grow justify-content-end">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default class App extends Component {
    render() {
        return (
            <div>
                <AppHeader/>
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        );
    }
}