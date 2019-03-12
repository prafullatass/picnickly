import React, { Component } from "react"


class Input extends Component {
     render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input
                    defaultValue=""
                    type={this.props.type}
                    name={this.props.id}
                    id={this.props.id}
                    onChange={this.props.handleFieldChange}
                    value={this.props.value}
                    onKeyDown={this.props.onKeyPressEvent}
                />
            </div>
        )
    }
}

export default Input