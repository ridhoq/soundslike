import React, {Component} from "react";
import {LogInForm, SignUpForm} from "../../components/login/login"

export default class LogInFormContainer extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <LogInForm/>
                    <SignUpForm/>
                </div>
            </div>
        );
    }
}
