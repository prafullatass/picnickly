import React, { Component } from "react"
import Input from "../reusableComponents/Input";

class SelectPark extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="form-group">
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
                </div>

                <Input id="address" type="text" value={this.props.address}
                    label="Address : " />

                <div className="form-group">
                    <label htmlFor="parkDetails">Park Details : </label>
                    <textarea
                        className="form-control"
                        id="parkDetails"
                        placeholder="parkDetails"
                        value={this.props.parkDetails}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default SelectPark