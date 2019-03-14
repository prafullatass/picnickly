import React, { Component } from "react"


class TextArea extends Component {
     render() {
        return (
            <div>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <textarea
                    type={this.props.type}
                    name={this.props.id}
                    id={this.props.id}
                    onChange={this.props.handleFieldChange}
                    value={this.props.value}
                />
            </div>
        )
    }
}

export default TextArea