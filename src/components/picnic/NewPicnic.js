import React, { Component } from "react";
import ParkData from "../../ResourceManager/ParkDataManager";

export default class PicnicForm extends Component {
  // Set initial state
  state = {
    "picnicId": "",
    "userId": "",
    "ParkName": "",
    "Address": "",
    parks : []
  };

  componentDidMount() {
    ParkData.GETALL()
    .then(parkdata =>
      parkdata.filter(park => park.picnic_shelters="yes"))
      this.setstate(parks : parkdata)
    }

    handleFieldChange = evt => {
      const stateToChange = {};
      stateToChange[evt.target.id] = evt.target.value;
      this.setState(stateToChange);
    };

    render() {
      console.log(parkdata)
    return (
      <React.Fragment>
        <form className="picnicForm">
          <div className="form-group">
            <label htmlFor="parkName">Park name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="eventName"
              placeholder="Event name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventLocation">Location</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="eventLocation"
              placeholder="Location"
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventDate">Assign to caretaker</label>
            <input
              defaultValue=""
              type="date"
              name="eventDate"
              id="eventDate"
              onChange={this.handleFieldChange}
            />
          </div>
          <button
            type="submit"
            onClick={this.NewEvent}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}