import React, { Component } from "react"
import "../picnic/picnic.css"

class Input extends Component {
    render() {
        let selectedclass = this.props.className ? this.props.className + " form-group" : "form-group"
        return (
            <div className={selectedclass}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input
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