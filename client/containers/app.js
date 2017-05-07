import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {NavDropdown, DropdownToggle, DropdownItem, DropdownMenu} from "reactstrap";

import {logOut} from "../actions";

class UserControl extends Component {
    constructor(props) {
        super(props);
        this.state = {dropdownOpen: false};
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav caret>
                    {this.props.user.username}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={this.props.dispatchLogOut}>Log Out</DropdownItem>
                </DropdownMenu>
            </NavDropdown>
        );
    }
}

class LogInControl extends Component {
    render() {
        return (
            <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
            </li>
        );
    }
}

class UnconnectedAuthControl extends Component {
    render() {
        let component = null;
        if (this.props.user) {
            component = <UserControl user={this.props.user} dispatchLogOut={this.props.dispatchLogOut}/>;
        }
        else {
            component = <LogInControl />;
        }
        return component;
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchLogOut: () => {
            dispatch(logOut());
        }
    };
};

const AuthControl = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedAuthControl);

class AppHeader extends Component {
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
                        <AuthControl/>
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