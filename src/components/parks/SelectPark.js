import React, { Component } from "react"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Input from "../reusableComponents/Input";
import TextArea from "../reusableComponents/TextArea";

class SelectPark extends Component {

    state = {
        modal: false,
        dropDownValue: 'Select action',
        dropdownOpen: false
    };

    toggle = (event) => {

        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        const _this = this
        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        Select Park Name
                    </DropdownToggle>
                    <DropdownMenu style={{overflowY: "scroll",  maxHeight: "400px" }}>
                        {_this.props.parks.map(e => (
                            <DropdownItem key={e.id} id={e.id} value={e.parkName}
                                onClick={_this.props.handleParkNameChange}>
                                {e.parkName}
                            </DropdownItem>))}
                    </DropdownMenu>
                </Dropdown>
                {/* <div className="form-group">
                            <label htmlFor="parkName">Select Park</label>
                            <select
                                defaultValue=""
                                name="parkName"
                                id="parkName"
                                onChange={this.props.handleParkNameChange} >
                                <option value="">-- Select an park --</option>
                                {this.props.parks.map(e => (
                                    <option key={e.id} id={e.id} value={e.parkName}>
                                        {e.parkName}
                                    </option>
                                ))}
                            </select>
                        </div> */}
                <Input id="parkName" type="text" value={this.props.parkName}
                    label="Park Name : " />
                <Input id="address" type="text" value={this.props.address}
                    label="Address : " />

                <TextArea id="parkDetails" value={this.props.parkDetails} />
            </React.Fragment>
        )
    }
}

export default SelectPark