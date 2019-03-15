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
import { Label } from "reactstrap"

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
        console.log("componentDidMount -- EditPicnic")
        let fetchedObj = {}
        sessionStorage.setItem("picnic", this.props.match.params.picnicId)
        const promises = []
        GetParkData().then(parks => {
            fetchedObj.parks = parks

            promises.push(PicnicManager.GET(this.props.match.params.picnicId)
                .then(picnicData => {
                    fetchedObj.parkName = picnicData.parkName
                    fetchedObj.address = picnicData.address
                    fetchedObj.picnicDate = picnicData.picnicDate
                    fetchedObj.userId = picnicData.userId
                    fetchedObj.parkDetails = parks.find(park => park.parkName === picnicData.parkName).features
                }))
            promises.push(this.getDataForArray(GamesManager, "selectedGames", "gameId"))
            promises.push(this.getDataForArray(ItemsManager, "selectedItems", "itemId"))
            promises.push(this.getDataForArray(FoodItemsManager, "selectedFoodItems", "foodItemName"))
            Promise.all(promises).then(() => {
                this.setState(fetchedObj)
            })
        })
    }


    getDataForArray = (objManager, arrayName, idName) => {
        return objManager.GETALLPICNICDATA(sessionStorage.getItem("picnic")).then(allData => {
            allData.forEach(data => {
                this.state[arrayName].push(data[idName])
            });
        })
    }

    checkArray = (id) => {

        const t = this.state.selectedGames.includes(id) ? true : false
        console.log(t, "checkedArray ", this.state.selectedGames, id)
        return t
    }

    handleCheckBoxChangeGames = (event) => {
        let NewArray = this.state.selectedGames
        if (this.checkArray(parseInt(event.target.id))) {
            event.target.checked = false
            const idx = NewArray.findIndex(gameId => gameId === parseInt(event.target.id))
            if (idx !== -1){
                NewArray.splice(idx, 1)
            }
        }
        else{
            NewArray.push(parseInt(event.target.id))
        }
        this.setState({ selectedGames: NewArray})
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
                                <div key={game.id}>
                                    <input type="checkbox"
                                        name={game.gameName}
                                        id={game.id}
                                        checked={this.checkArray(game.id)}
                                        onChange={this.handleCheckBoxChangeGames} />
                                    <Label for={game.gameName}>{game.gameName}</Label>
                                </div>
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