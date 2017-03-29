import React, {Component} from "react";

export default class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: true};

    }

    handleClose = (e) => {
        e.preventDefault();
        this.setState({visible: false});
    };

    render() {
        if (this.state.visible) {
            return (
                <div className={"alert alert-" + this.props.alertType + " alert-dismissible"}>
                    <button type="button" className="close" onClick={this.handleClose} />
                    {this.props.alertMessage}
                </div>
            );
        }
        else {
            return null;
        }
    }
}