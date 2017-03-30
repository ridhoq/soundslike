import React, {Component} from "react";
import {LogInForm, SignUpForm} from "../components/login"
import Alert from "../components/alert"
import APIHelper from "../utils/apihelper"

export default class LogInFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {signUpError: false};
    }

    handleSignUp = (user) => {
        APIHelper.signUp(user).then(response => {
            if (response && response.status == 200) {
                return;
            }

            this.setState({
                signUpError: true,
                signUpErrorMessage: response ? response.json.message : "server error"
            });
        });
    };

    handleDangerAlertClose = (e) => {
        e.preventDefault();
        this.setState({signUpError: false});
    };

    render() {
        return (
            <div className="container">
                {this.state.signUpError && (
                    <Alert
                        alertType="danger"
                        alertMessage={this.state.signUpErrorMessage}
                        handleClose={this.handleDangerAlertClose}
                    />
                )}
                <div className="row">
                    <LogInForm/>
                    <SignUpForm handleSignUp={this.handleSignUp} />
                </div>
            </div>
        );
    }
}
