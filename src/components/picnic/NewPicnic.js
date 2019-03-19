import React, { Component } from "react";
import Checkbox from "../reusableComponents/checkBox";
import Input from "../reusableComponents/Input";
import SelectPark from "../parks/SelectPark";
import Button from "../reusableComponents/Button";
import CreateObject from "../../Modules/CreateObject";

import "./picnic.css"
import ModelNewObj from "./ModelNewObj";
import GetParkData from "../../Modules/GetParkData";
import UpdateArray from "../../Modules/UpdateArray";
import UsefulFn from "../../Modules/UsalfulFn";
import Validation from "../../Modules/Validation";
import { Label } from "reactstrap"
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';


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
    selectedFoodItems: [],
    activeTab: '1'

  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

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

  handleCheckBoxChangeFoodItem = (event) => {
    let NewArray = UpdateArray.Update(event.target.id, this.state.selectedFoodItems, "yes")
    this.setState({ selectedItems: NewArray })
  }

  onKeyPressEvent = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const newFoodList = this.state.selectedFoodItems.slice()
      const newFoodItem = UsefulFn.CapitalizeFirstLetter(event.target.value)
      if (Validation.Duplicate(newFoodItem, this.state.selectedFoodItems) === false) {
        newFoodList.push(newFoodItem)
        this.setState({
          selectedFoodItems: newFoodList
        })
      }
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

          <div className="TabContainer">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Games
            </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Necessity Items
            </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  Food Items
            </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="form-group">
                  <div className="inlineAll">
                    <label htmlFor="games">Select Games</label>
                    <ModelNewObj createNewObject={this.props.createMyGame}
                      buttonLabel="New Game"
                      label="New Game : "
                      createObjFn={CreateObject.MyGamesObj}
                      list={this.props.myGames.filter(game =>
                        game.userId === parseInt(sessionStorage.getItem("credentials"))
                      ).map(game => game.gameName)}
                    />
                  </div>
                  <div>
                    {this.props.myGames.filter(game =>
                      game.userId === parseInt(sessionStorage.getItem("credentials"))
                    ).map(game => (
                      <Checkbox key={game.id} id={game.id}
                        displayName={game.gameName}
                        checked={false}
                        onChange={this.handleCheckBoxChangeGames} />
                    ))}
                  </div>
                </div>

              </TabPane>
              <TabPane tabId="2">

                <div className="form-group">
                  <div className="inlineAll">
                    <label htmlFor="items">Select items -</label>
                    <ModelNewObj createNewObject={this.props.createItemsList}
                      buttonLabel=" New Item"
                      label="Name of Item : "
                      createObjFn={CreateObject.ItemListObj}
                      list={this.props.itemList.map(item => item.itemName)}
                    />
                  </div>
                  <div>
                    {this.props.itemList.map(item => (
                      <Checkbox key={item.id} id={item.id} displayName={item.itemName} checked={false}
                        onChange={this.handleCheckBoxChangeItems} />
                    ))}
                  </div>
                </div>

              </TabPane>
              <TabPane tabId="3">

                <Input id="foodItem" onKeyPressEvent={this.onKeyPressEvent}
                  type="text"
                  label="Food Items " />

                {/* <Input id="selectedFoodItems" type="text" label="List of Food :"
            value={this.state.selectedFoodItems} /> */}

                {this.state.selectedFoodItems.map(foodItem =>
                  <div key={foodItem}>
                    <input type="checkbox"
                      name={foodItem}
                      id={foodItem}
                      checked={true}
                      onChange={this.handleCheckBoxChangeFoodItem} />
                    <Label for={foodItem}>{foodItem}</Label>
                  </div>
                )}

              </TabPane>
            </TabContent>
          </div>
          <div className="btnContainer">
            <Button caption="Submit" className="submitButton CommonButton"
              onClickFunction={this.SubmitForm} />
            <Button caption="Cancel" className = "cancelButton CommonButton"
              onClickFunction={() => this.props.history.push("/")} />
          </div>
        </form >
      </React.Fragment >
    )
  }
}

