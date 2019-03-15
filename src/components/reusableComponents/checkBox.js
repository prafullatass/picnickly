import React, { Component } from 'react';
import {Label} from "reactstrap"
class Checkbox extends Component {

    state = { checked: false};

    onClicked = evt => {
        const targetId = evt.target.id
        //set the state and callback onchange function after that
        this.setState(
            {checked: !this.state.checked },
            function () {
                this.props.onChange(targetId, this.state.checked)
            })

    }

    render() {

        return (
            <div key = {this.props.id}>
                <input type="checkbox"
                    name={this.props.displayName}
                    id={this.props.id}
                    checked={this.state.checked}
                    onChange={this.onClicked} />
                <Label for={this.props.displayName}>{this.props.displayName}</Label>
            </div>
        )
    }
}


export default Checkbox