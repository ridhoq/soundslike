import React, {Component} from "react";

export default class Alert extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={"alert alert-" + this.props.alertType + " alert-dismissible"} role="alert">
                <button type="button" className="close" onClick={this.props.handleClose} aria-label="Close"/>
                {this.props.alertMessage}
            </div>
        );
    }

    propTypes = {
        alertMessage: React.PropTypes.string.isRequired,
        handleClose: React.PropTypes.func.isRequired
    };
}

