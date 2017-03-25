import React, {Component} from "react";

export default class LoginForm extends Component {
    render() {
        return (
            <form>
                <div className="form-group">
                    <label>Username/Email</label>
                    <input type="email" className="form-control" placeholder="Username/Email"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password"/>
                </div>
            </form>
        );
    }
}
