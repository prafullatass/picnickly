import React, { Component } from 'react';

class Checkbox extends Component {
    state = {
        checked: false
    }

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
            <div>
                <input type="checkbox"
                    name={this.props.id}
                    id={this.props.id}
                    checked={this.state.checked}
                    onChange={this.onClicked} />
                <label for={this.props.id}>{this.props.displayName}</label>
            </div>
        )
    }
}


export default Checkbox