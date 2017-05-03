import React, {Component} from "react";
import {withRouter} from "react-router-dom"
import {LogInForm, SignUpForm} from "../components/login"
import Alert from "../components/alert"
import APIHelper from "../utils/apihelper"
import AuthHelper from "../utils/authhelper"

class LogInFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {error: false};
    }

    handleSignUp = (user) => {
        APIHelper.signUp(user).then(response => {
            if (response && response.status === 200) {
                this.handleLogIn(user);
            }
            else {
                this.setState({
                    error: true,
                    errorMessage: response ? response.json.message : "server error"
                });
            }
        });
    };

    handleLogIn = (user) => {
        APIHelper.logIn(user).then(response => {
            if (response && response.status === 200) {
                console.log(response);
                const tokenObj = response.json;
                tokenObj.username = user.username;
                // TODO: emit action to redux store
                this.props.authHelper.logIn(tokenObj).then(() => {
                    this.props.history.push("/");
                });
            }
            else {
                this.setState({
                    error: true,
                    errorMessage: response ? response.json.message : "server error"
                });
            }
        });
    };

    handleDangerAlertClose = (e) => {
        e.preventDefault();
        this.setState({error: false});
    };

    render() {
        return (
            <div className="container">
                {this.state.error && (
                    <Alert
                        id="signUpErrorAlert"
                        alertType="danger"
                        alertMessage={this.state.errorMessage}
                        handleClose={this.handleDangerAlertClose}
                    />
                )}
                <div className="row">
                    <LogInForm handleLogIn={this.handleLogIn} />
                    <SignUpForm handleSignUp={this.handleSignUp} />
                </div>
            </div>
        );
    }
}

export default withRouter(LogInFormContainer);
