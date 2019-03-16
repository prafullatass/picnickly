import React, { Component } from "react";
import ParkData from "../../ResourceManager/ParkDataManager";
import Checkbox from "../reusableComponents/checkBox";
import Input from "../reusableComponents/Input";
import SelectPark from "../parks/SelectPark";
import Button from "../reusableComponents/Button";
import CreateObject from "../../Modules/CreateObject";

import "./picnic.css"
import ModelNewObj from "./ModelNewObj";
import GetParkData from "../../Modules/GetParkData";
import UpdateArray from "../../Modules/UpdateArray";
export default class PicnicForm extends Component {
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
    GetParkData().then(parks =>
      this.setState({ parks: parks }))
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleParkNameChange = obj => {
    this.setState(obj)
  }

  handleCheckBoxChangeGames = (id) => {
    let NewArray = UpdateArray.Update(id, this.state.selectedGames)
    this.setState({ selectedGames: NewArray })
  }

  handleCheckBoxChangeItems = (id) => {
    let NewArray = UpdateArray.Update(id, this.state.selectedItems)
        this.setState({ selectedItems: NewArray })
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



          <ModelNewObj createNewObject={this.props.createMyGame}
            buttonLabel="Add New Game"
            label="New Game : "
            createObjFn={CreateObject.MyGamesObj}
          />

          <div className="form-group">
            <label htmlFor="items">Select items</label>
            <div>
              {this.props.itemList.map(item => (
                <Checkbox id={item.id} displayName={item.itemName} checked={false}
                  onChange={this.handleCheckBoxChangeItems} />
              ))}
            </div>
          </div>

          <ModelNewObj createNewObject={this.props.createItemsList}
            buttonLabel="Add New Necessity Item"
            label="Name of Item : "
            createObjFn={CreateObject.ItemListObj}
          />

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

