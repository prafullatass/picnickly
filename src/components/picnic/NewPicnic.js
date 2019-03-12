import React, { Component } from "react";
import ParkData from "../../ResourceManager/ParkDataManager";
import Checkbox from "../reusableComponents/checkBox";

export default class PicnicForm extends Component {
  getfeatures(obj) {
    return Object.keys(obj).filter(key => obj[key] === "Yes")
      .map(key => key.replace("_", " "));
  }
  // Set initial state
  state = {
    picnicId: "",
    userId: "",
    parkName: "",
    address: "",
    parkDetails: "",
    picnicDate: "",
    parks: [],
    dropdownOpen: false,
    selectedGames: []
  };

  componentDidMount() {
    ParkData.GETALL()
      .then(parkdata => {
        const parks = parkdata.filter(park => park.picnic_shelters === "Yes")
          .sort((a, b) => a.park_name > b.park_name ? 1 : -1)
          .map((park, index) => {
            return {
              id: index,
              parkName: park.park_name,
              address: park.mapped_location_address,
              address2: park.mapped_location_city + " " + park.mapped_location_state,
              features: this.getfeatures(park)
            }
          })
        this.setState({ parks: parks })
      })
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleParkNameChange = evt => {
    const selectedPark = this.state.parks.find(park => park.parkName === evt.target.value)
    this.setState({
      address: selectedPark.address + ", " + selectedPark.address2,
      parkName: selectedPark.parkName,
      parkDetails: selectedPark.features.join(",\r\n ")
    })
  }

  //add or delete id from given array
  AddIdToSelectedArray = (id, status, selectedArray) => {
    if (status)
        this.state[selectedArray].push(id)
    else {
        const idx = this.state[selectedArray].findIndex(gameId => gameId === id)
        if (idx !== -1)
            this.state[selectedArray].splice(idx, 1)
    }

}

  handleCheckBoxChangeChange = (id, status) => {
    console.log(status)
    this.AddIdToSelectedArray(id,status,"selectedGames")
    console.log(this.state.selectedGames)
  }

  render() {
    console.log("render", this.state)
    return (
      <React.Fragment>
        <form className="picnicForm">
          <div className="form-group">
            <label htmlFor="parkName">Select Park</label>
            <select
              defaultValue=""
              name="parkName"
              id="parkName"
              onChange={this.handleParkNameChange} >
              <option value="">-- Select an park --</option>
              {this.state.parks.map(e => (
                <option key={e.id} id={e.id} value={e.parkName}>
                  {e.parkName}
                </option>
              ))}
            </select>

          </div>
          <div className="form-group">
            <label htmlFor="address">Address : </label>
            <textarea
              type="text"
              required
              className="form-control"
              id="address"
              placeholder="address"
              value={this.state.address}
            />
          </div>
          <div className="form-group">
            <label htmlFor="parkDetails">Park Details : </label>
            <textarea
              className="form-control"
              id="parkDetails"
              placeholder="parkDetails"
              value={this.state.parkDetails}
            />
          </div>
          <div className="form-group">
            <label htmlFor="picnicDate">Picnic Date : </label>
            <input
              defaultValue=""
              type="date"
              name="picnicDate"
              id="picnicDate"
              onChange={this.handleFieldChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="games">Select Games</label>
            <div>
              {this.props.myGames.filter(game =>
                  game.userId === parseInt(sessionStorage.getItem("credentials"))
              ).map(game => (
                <Checkbox id={game.id} displayName ={game.gameName} checked={false}
                  onChange={this.handleCheckBoxChangeChange} />
              ))}
            </div>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

