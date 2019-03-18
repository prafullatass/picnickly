import React, { Component } from "react"
import "../parks/park.css"

class TextArea extends Component {
     render() {
        return (
            <div className ={this.props.divClass} >
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <textarea
                    type={this.props.type}
                    name={this.props.id}
                    id={this.props.id}
                    onChange={this.props.handleFieldChange}
                    value={this.props.value}
                    disabled = {this.props.disabled}
                    className={this.props.className}
                />
            </div>
        )
    }
}

export default TextArea