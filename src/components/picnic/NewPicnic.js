import React, { Component } from "react";
import ParkData from "../../ResourceManager/ParkDataManager";
import Checkbox from "../reusableComponents/checkBox";
import Input from "../reusableComponents/Input";
import SelectPark from "../parks/SelectPark";

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
    selectedGames: [],
    selectedItem:[]
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
    this.AddIdToSelectedArray(id, status, "selectedGames")
    console.log(this.state.selectedGames)
  }

  render() {
    console.log("render", this.state)
    return (
      <React.Fragment>
        <form className="picnicForm">

          <SelectPark handleParkNameChange={this.handleParkNameChange}
            parks={this.state.parks}
            address={this.state.address}
            parkDetails={this.state.parkDetails} />

          <Input id="picnicDate" handleFieldChange={this.handleFieldChange}
            type="date"
            label="Picnic Date :" />

          <div className="form-group">
            <label htmlFor="games">Select Games</label>
            <div>
              {this.props.myGames.filter(game =>
                game.userId === parseInt(sessionStorage.getItem("credentials"))
              ).map(game => (
                <Checkbox id={game.id} displayName={game.gameName} checked={false}
                  onChange={this.handleCheckBoxChangeChange} />
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="items">Select items</label>
            <div>
              {this.props.items.filter(item =>
                item.userId === parseInt(sessionStorage.getItem("credentials"))
              ).map(item => (
                <Checkbox id={item.id} displayName={item.itemName} checked={false}
                  onChange={this.handleCheckBoxChangeChange} />
              ))}
            </div>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

