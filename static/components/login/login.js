import React, {Component} from "react";

export class LoginForm extends Component {
    handleSubmit(e) {
        e.preventDefault();
        console.log("handled submit");
    }

    render() {
        return (
            <div className="col">
                <h4>Login</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username/Email</label>
                        <input type="email" className="form-control" placeholder="Username/Email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Log in</button>
                </form>
            </div>
        );
    }
}

export class SignUpForm extends Component {
    handleSubmit(e) {
        e.preventDefault();
        console.log("handled submit");
    }

    render() {
        return (
            <div className="col">
                <h4>Sign Up</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Username"/>
                    </div>
                    <div className="form-group">
                        <label>Email (optional)</label>
                        <input type="email" className="form-control" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" placeholder="Confirm Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Log in</button>
                </form>
            </div>
        );
    }
}
