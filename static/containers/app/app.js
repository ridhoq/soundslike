import React, {Component} from "react";

export class AppHeader extends Component {
    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary main-nav">
                <div className="container">
                    <ul className="nav navbar-nav flex-grow">
                        <a className="navbar-brand" href="#">soundslike</a>
                    </ul>
                    <ul className="nav navbar-nav flex-grow justify-content-center">
                        <form className="form-inline">
                            <input className="form-control" type="text" placeholder="Search"/>
                        </form>
                    </ul>
                    <ul className="nav navbar-nav flex-grow justify-content-end">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Login</a>
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