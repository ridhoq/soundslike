import React, {Component} from "react";
import {LoginForm, SignUpForm} from "../../components/login/login"

export default class LoginFormContainer extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <LoginForm/>
                    <SignUpForm/>
                </div>
            </div>
        );
    }
}
