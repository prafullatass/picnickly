import React, { Component } from "react"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Input from "../reusableComponents/Input";
import TextArea from "../reusableComponents/TextArea";
import "./park.css"
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

    ParkNameChange = evt => {
        let _this = this
        const selectedPark = this.props.parks.find(park => park.parkName === evt.target.value)
        const obj = {
            address: selectedPark.address + ", " + selectedPark.address2,
            parkName: selectedPark.parkName,
            parkDetails: selectedPark.features.join(", \n ")
        }
        _this.props.handleParkNameChange(obj)
    }

    render() {
        const _this = this
        return (
            <React.Fragment>
                <div className="inlineAll">
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} size = "sm">
                        <DropdownToggle caret color="info">
                            Select Park Name
                    </DropdownToggle>
                        <DropdownMenu style={{ overflowY: "scroll", maxHeight: "400px" }}>
                            {_this.props.parks.map(e => (
                                <DropdownItem key={e.id} id={e.id} value={e.parkName}
                                    onClick={_this.ParkNameChange}>
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
                        label="" className="name" />
                </div>
                <TextArea id="parkDetails" label="Park Details" value={this.props.parkDetails}
                className = "details" divClass = "rightFloat" />

                <Input id="address" type="text" value={this.props.address}
                    label="Address : " className= "address" />

            </React.Fragment>
        )
    }
}

export default SelectPark