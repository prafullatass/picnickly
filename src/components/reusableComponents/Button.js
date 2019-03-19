import React, { Component } from "react";

export default class Button extends Component {
    render() {
        return (
            <button
                type="submit"
                className={this.props.className}
                onClick={this.props.onClickFunction}
            >
                {this.props.caption}
            </button>
        )
    }
}