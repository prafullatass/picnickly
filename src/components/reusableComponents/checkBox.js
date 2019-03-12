import React, {Component} from 'react';

//const Checkbox = ({ id, displayName, checked, onChange }) => (
class Checkbox extends Component {
    state = {
        checked :  false
    }

    onClicked = evt => {
        this.setState({checked : !this.state.checked})
        this.props.onChange(evt.target.id, this.state.checked)
    }

    render() {
        return(

        <div>
            <label for={this.props.id}>{this.props.displayName}</label>
            <input type="checkbox"
            name={this.props.id}
            id={this.props.id}
            checked={this.state.checked}
            onChange={this.onClicked} />
        </div>
        )}
}


export default Checkbox