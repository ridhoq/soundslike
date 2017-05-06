import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {LogInForm, SignUpForm} from "../components/login";
import Alert from "../components/alert";
import APIHelper from "../utils/apihelper";
import {logIn} from "../actions";

class UnconnectedLogInFormContainer extends Component {
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
                delete user.password;
                const userWithToken = Object.assign(user, response.json);
                this.props.logInDispatch(userWithToken);
                this.props.history.push("/");
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

const mapDispatchToProps = (dispatch) => {
    return {
        logInDispatch: (user) => {
            dispatch(logIn(user))
        }
    };
};

const LogInContainer = withRouter(connect(
    null,
    mapDispatchToProps
)(UnconnectedLogInFormContainer));

export default LogInContainer;
