import React, {Component} from "react";
import {LogInForm, SignUpForm} from "../../components/login/login"
import Alert from "../../components/alert/alert"
import APIHelper from "../../middleware/apihelper"

export default class LogInFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {signupError: false};
    }

    handleSignUp = (user) => {
        APIHelper.signUp(user).then(response => {
            if (response && response.status == 200) {
                return;
            }

            this.setState({
                signupError: true,
                signupErrorMessage: response ? response.json.message : "server error"
            });
        });
    };

    render() {
        return (
            <div className="container">
                {this.state.signupError && (
                    <Alert alertType="danger" alertMessage={this.state.signupErrorMessage}/>
                )}
                <div className="row">
                    <LogInForm/>
                    <SignUpForm handleSignUp={this.handleSignUp} />
                </div>
            </div>
        );
    }
}
