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
        const response = APIHelper.signUp(user);
        if (response && response.status == 200) {
          return;
        }
        this.setState({
          signupError: true,
          signupErrorMessage: response ? response.error.json.message : "server error"
        });
    };

    render() {
        return (
            <div className="container">
                {this.state.signupError && (
                    <Alert alertType="error" alertMessage={this.state.signupErrorMessage}/>
                )}
                <div className="row">
                    <LogInForm/>
                    <SignUpForm handleSignUp={this.handleSignUp} />
                </div>
            </div>
        );
    }
}
