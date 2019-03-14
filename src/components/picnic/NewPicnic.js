import React, { Component } from "react";
import ParkData from "../../ResourceManager/ParkDataManager";
import Checkbox from "../reusableComponents/checkBox";
import Input from "../reusableComponents/Input";
import SelectPark from "../parks/SelectPark";
import Button from "../reusableComponents/Button";
import CreateObject from "../../Modules/CreateObject";

import "./picnic.css"
import ModelNewGame from "./ModelNewGame";
export default class PicnicForm extends Component {
  getfeatures(obj) {
    return Object.keys(obj).filter(key => obj[key] === "Yes")
      .map(key => key.replace("_", " "));
  }
  // Set initial state
  state = {
    userId: "",
    parkName: "",
    address: "",
    parkDetails: "",
    picnicDate: "",
    parks: [],
    dropdownOpen: false,
    selectedGames: [],
    selectedItems: [],
    selectedFoodItems: []
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
      this.setState({ selectedArray: this.state[selectedArray].push(id) })
    else {
      const idx = this.state[selectedArray].findIndex(gameId => gameId === id)
      if (idx !== -1)
        this.setState({ selectedArray: this.state[selectedArray].splice(idx, 1) })
    }

  }

  handleCheckBoxChangeGames = (id, status) => {
    console.log(status)
    this.AddIdToSelectedArray(id, status, "selectedGames")
    console.log(this.state.selectedGames)
  }

  handleCheckBoxChangeItems = (id, status) => {
    console.log(status)
    this.AddIdToSelectedArray(id, status, "selectedItems")
    console.log(this.state.selectedItems)
  }

  onKeyPressEvent = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const newFoodList = this.state.selectedFoodItems.slice()
      newFoodList.push(event.target.value)
      this.setState({
        selectedFoodItems: newFoodList
      })
      event.target.value = ""

    }
    console.log(this.state.selectedFoodItems)
  }

  SubmitForm = (evt) => {

    evt.preventDefault();
    let promises = []
    const uid = parseInt(sessionStorage.getItem("credentials"))

    let obj = CreateObject.PicnicObj(uid, this.state.parkName, this.state.address, this.state.picnicDate)
    this.props.createPicnic(obj).then(
      e => {
        this.state.selectedGames.forEach(game => {
          promises.push(this.props.createGames(
            CreateObject.GamesObj(parseInt(sessionStorage.getItem("picnic")), parseInt(game), false)))
        });
        this.state.selectedItems.forEach(items => {
          promises.push(this.props.createItems(
            CreateObject.ItemsObj(parseInt(sessionStorage.getItem("picnic")), parseInt(items), false)))
        });
        this.state.selectedFoodItems.forEach(foodItem => {
          promises.push(this.props.createFoodItems(
            CreateObject.FoodItemsObj(parseInt(sessionStorage.getItem("picnic")), foodItem, false)))
        });
        Promise.all(promises).then(() => {
          this.props.setStateOfAll()
          this.props.history.push("/")
        })
      }
    )
  }

  // MyNewGame = () => {
  //   //console.log("New Game")
  //   <ModelNewGame />
  // }

  render() {
    console.log("render", this.state)
    return (
      <React.Fragment>
        <form className="picnicForm">

          <SelectPark handleParkNameChange={this.handleParkNameChange}
            parks={this.state.parks}
            address={this.state.address}
            parkDetails={this.state.parkDetails}
            parkName={this.state.parkName} />

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
                  onChange={this.handleCheckBoxChangeGames} />
              ))}
            </div>
          </div>



          <ModelNewGame createMyGame={this.props.createMyGame} />

          <div className="form-group">
            <label htmlFor="items">Select items</label>
            <div>
              {this.props.itemList.map(item => (
                <Checkbox id={item.id} displayName={item.itemName} checked={false}
                  onChange={this.handleCheckBoxChangeItems} />
              ))}
            </div>
          </div>

          <Input id="foodItem" onKeyPressEvent={this.onKeyPressEvent}
            type="text"
            label="Food Items " />
          <Input id="selectedFoodItems" type="text" label="List of Food :"
            value={this.state.selectedFoodItems} />

          <Button caption="Submit"
            onClickFunction={this.SubmitForm} />
        </form>
      </React.Fragment>
    )
  }
}

