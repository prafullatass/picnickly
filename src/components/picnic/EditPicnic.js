import React, { Component } from "react"
import GetParkData from "../../Modules/GetParkData";
import SelectPark from "../parks/SelectPark";
import Input from "../reusableComponents/Input";
import Checkbox from "../reusableComponents/checkBox";
import ModelNewObj from "./ModelNewObj";
import CreateObject from "../../Modules/CreateObject";
import Button from "../reusableComponents/Button";
import PicnicManager from "../../ResourceManager/PicnicManager";
import GamesManager from "../../ResourceManager/GamesManager";
import ItemsManager from "../../ResourceManager/ItemsManager";
import FoodItemsManager from "../../ResourceManager/FoodItemsManager";

class EditPicnic extends Component {
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
        console.log("comdidmount edit")
        let fetchedObj = {}
        sessionStorage.setItem("picnic", this.props.match.params.picnicId)
        GetParkData().then(parks => {
            fetchedObj.parks = parks

            PicnicManager.GET(this.props.match.params.picnicId)
                .then(picnicData => {
                    fetchedObj.parkName = picnicData.parkName
                    fetchedObj.address = picnicData.address
                    fetchedObj.picnicDate = picnicData.picnicDate
                    fetchedObj.userId = picnicData.userId
                    fetchedObj.parkDetails = parks.find(park => park.parkName === picnicData.parkName).features
                    this.setState(fetchedObj)
                })
            this.getDataForArray(GamesManager, "selectedGames", "gameId")
            this.getDataForArray(ItemsManager, "selectedItems", "itemId")
            this.getDataForArray(FoodItemsManager, "selectedFoodItems", "foodItemName")
        })
    }


    getDataForArray = (objManager, arrayName, idName) => {
        objManager.GETALLPICNICDATA(sessionStorage.getItem("picnic")).then(allData => {
            allData.forEach(data => {
                this.state[arrayName].push(data[idName])
            });
        })
    }

    checkArray= (id) => {
        this.state.selectedGames.includes(id)?true :false
        console.log(t)
        return t
    }
    render() {
        console.log("edit", this.state)
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
                        label="Picnic Date :"
                        value={this.state.picnicDate} />

                    <div className="form-group">
                        <label htmlFor="allData">Select Games</label>
                        <div>
                            {this.props.myGames.filter(game =>
                                game.userId === parseInt(sessionStorage.getItem("credentials"))
                            ).map(game => (
                                <Checkbox key = {game.id} id={game.id} displayName={game.gameName}
                                checked= {false}
                                onChange={this.handleCheckBoxChangeGames}
                                selectedArray = {this.state.selectedGames}/>
                            )
                        )}
                        </div>
                    </div>



                    <ModelNewObj createNewObject={this.props.createMyGame}
                        buttonLabel="Add New Game"
                        label="New Game : "
                        createObjFn={CreateObject.MyGamesObj}
                    />

                    {/*<div className="form-group">
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
                        onClickFunction={this.SubmitForm} /> */}
                </form>
            </React.Fragment>
        )
    }
}
export default EditPicnic