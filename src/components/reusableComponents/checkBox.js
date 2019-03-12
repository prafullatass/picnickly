import React, {Componant} from 'react';

//const Checkbox = ({ id, displayName, checked, onChange }) => (
class Checkbox extends Componant {
    state = {
        checked :  false
    }

    onClicked = evt => {
        this.setState({checked : true})
    }
    render() {
        return(

        <div>
            <label for={this.prop.id}>{this.prop.displayName}</label>
            <input type="checkbox" name={this.prop.id} id={this.prop.id}
            checked={this.state.checked} onChange={this.prop.onChange} />
        </div>
        )}
}


export default Checkbox