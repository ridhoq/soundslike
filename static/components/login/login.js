import React, {Component} from "react";
import validator from "validator";
import classNames from "classnames";
import update from 'immutability-helper';;

export class LogInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("handled submit");
    }

    render() {
        return (
            <div className="col">
                <h4>Log In</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username/Email</label>
                        <input type="email" className="form-control" placeholder="Username/Email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
        );
    }
}

export class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            validUsername: null,
            validEmail: null,
            validPassword: null,
            validConfirmPassword: null,
        };
    }

    handleUsernameChange = (e) => {
        const val = e.target.value;
        if (!validator.isEmpty(val) && validator.isAscii(val)) {
            this.setState({
                validUsername: true,
                user: update(this.state.user, {username: {$set: val}})
            });
        }
        else {
            this.setState({
                validUsername: false,
                user: update(this.state.user, {username: {$set: null}})
            });
        }
    };

    handleEmailChange = (e) => {
        const val = e.target.value;
        if (!validator.isEmpty(val) && validator.isEmail(val)) {
            this.setState({
                validEmail: true,
                user: update(this.state.user, {email: {$set: val}})
            });
        }
        else {
            this.setState({
                validEmail: false,
                user: update(this.state.user, {email: {$set: null}})
            });
        }
    };

    handlePasswordChange = (e) => {
        const val = e.target.value;
        if (!validator.isEmpty(val) && validator.isAscii(val) && val.length >= 6) {
            this.setState({
                validPassword: true,
                user: update(this.state.user, {password: {$set: val}})
            });
        }
        else {
            this.setState({
                validPassword: false,
                user: update(this.state.user, {password: {$set: null}})
            });
        }
    };

    handleConfirmPasswordChange = (e) => {
        const val = e.target.value;
        if (!validator.isEmpty(val) && this.state.validPassword && val === this.state.user.password) {
            this.setState({validConfirmPassword: true});
        }
        else {
            this.setState({validConfirmPassword: false});
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("handled submit");
    };

    render() {

        // there's gotta be a better way to do this...
        const usernameClass = classNames({
            "form-control": true,
            "form-control-success": this.state.user.username,
            "form-control-danger": this.state.validUsername !== null && this.state.validUsername === false
        });

        const usernameGroup = classNames({
            "form-group": true,
            "has-success": this.state.user.username,
            "has-danger": this.state.validUsername !== null && this.state.validUsername === false
        });

        const emailClass = classNames({
            "form-control": true,
            "form-control-success": this.state.user.email,
            "form-control-danger": this.state.validEmail !== null && this.state.validEmail === false
        });

        const emailGroup = classNames({
            "form-group": true,
            "has-success": this.state.user.email,
            "has-danger": this.state.validEmail !== null && this.state.validEmail === false
        });

        const passwordClass = classNames({
            "form-control": true,
            "form-control-success": this.state.user.password,
            "form-control-danger": this.state.validPassword !== null && this.state.validPassword === false
        });

        const passwordGroup = classNames({
            "form-group": true,
            "has-success": this.state.user.password,
            "has-danger": this.state.validPassword !== null && this.state.validPassword === false
        });

        const confirmPasswordClass = classNames({
            "form-control": true,
            "form-control-success": this.state.validConfirmPassword,
            "form-control-danger": this.state.validConfirmPassword !== null && this.state.validConfirmPassword === false
        });

        const confirmPasswordGroup = classNames({
            "form-group": true,
            "has-success": this.state.validConfirmPassword,
            "has-danger": this.state.validConfirmPassword !== null && this.state.validConfirmPassword === false
        });

        return (
            <div className="col">
                <h4>Sign Up</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className={usernameGroup}>
                        <label className="form-control-label">Username</label>
                        <input type="text" className={usernameClass} onChange={this.handleUsernameChange} placeholder="Username"/>
                    </div>
                    <div className={emailGroup}>
                        <label className="form-control-label">Email</label>
                        <input type="email" className={emailClass} onChange={this.handleEmailChange} placeholder="Email"/>
                    </div>
                    <div className={passwordGroup}>
                        <label className="form-control-label">Password</label>
                        <input type="password" className={passwordClass} onChange={this.handlePasswordChange} placeholder="Password"/>
                        <small className="form-text text-muted">Must be at least 6 characters</small>
                    </div>
                    <div className={confirmPasswordGroup}>
                        <label className="form-control-label">Confirm Password</label>
                        <input type="password" className={confirmPasswordClass} onChange={this.handleConfirmPasswordChange} placeholder="Confirm Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Log in</button>
                </form>
            </div>
        );
    }
}
