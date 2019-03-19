import React, { Component } from "react"
import "../picnic/picnic.css"

class Input extends Component {
    render() {
        const divClass = this.props.divClass ? "form-group " + this.props.divClass: "form-group"
        return (
            <div className={divClass}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input
                    defaultValue={this.props.defaultValue}
                    className = {this.props.className}
                    type={this.props.type}
                    name={this.props.id}
                    id={this.props.id}
                    autoFocus={this.props.autofocus}
                    onChange={this.props.handleFieldChange}
                    value={this.props.value}
                    disabled={this.props.disabled}
                    onKeyDown={this.props.onKeyPressEvent}
                />
            </div>
        )
    }
}

export default Input