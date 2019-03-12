import React, { Component } from "react";
import ParkData from "../../ResourceManager/ParkDataManager";

export default class PicnicForm extends Component {
  getfeatures(obj) {
    return Object.keys(obj).filter(key => obj[key] === "Yes")
        .map(key => key.replace("_", " "));
  }
  // Set initial state
  state = {
    picnicId: "",
    userId: "",
    ParkName: "",
    Address: "",
    parks: []
  };

  componentDidMount() {
    ParkData.GETALL()
      .then(parkdata => {
        const parks = parkdata.filter(park => park.picnic_shelters === "Yes")
          .sort((a, b) => a.park_name > b.park_name ? 1 :-1)
          .map(park => {
                  return {name:park.park_name,
                  address:park.mapped_location_address,
                     features: this.getfeatures(park)}})
        this.setState({ parks: parks })
      })
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  render() {
    console.log(this.state.parks)
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