import React, { Component } from "react"
import GetParkData from "../../Modules/GetParkData";
import SelectPark from "../parks/SelectPark";
import Input from "../reusableComponents/Input";
import ModelNewObj from "./ModelNewObj";
import CreateObject from "../../Modules/CreateObject";
import Button from "../reusableComponents/Button";
import PicnicManager from "../../ResourceManager/PicnicManager";
import GamesManager from "../../ResourceManager/GamesManager";
import ItemsManager from "../../ResourceManager/ItemsManager";
import FoodItemsManager from "../../ResourceManager/FoodItemsManager";
import { Label } from "reactstrap"
import UpdateArray from "../../Modules/UpdateArray";
import Checkbox from "../reusableComponents/checkBox";

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

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    handleParkNameChange = obj => {
        this.setState(obj)
    }

    handleCheckBoxChangeGames = (event) => {
        let NewArray = UpdateArray.Update(event.target.id, this.state.selectedGames)
        this.setState({ selectedGames: NewArray })
    }

    handleCheckBoxChangeItems = (event) => {
        let NewArray = UpdateArray.Update(event.target.id, this.state.selectedItems)
        this.setState({ selectedItems: NewArray })
    }
    handleCheckBoxChangeFoodItems = (event) => {
        let NewArray = UpdateArray.Update(event.target.id, this.state.selectedFoodItems, "yes")
        this.setState({ selectedFoodItems: NewArray })
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

    UpdateForm = (evt) => {
        console.log("update")
        evt.preventDefault();
        let promises = []
        let obj = {}
        const uid = parseInt(sessionStorage.getItem("credentials"))
        const picnicId = parseInt(sessionStorage.getItem("picnic"))
        obj = CreateObject.PicnicObj(
            uid, this.state.parkName, this.state.address, this.state.picnicDate)
        obj.id = picnicId
        promises.push(this.props.updatePicnic(obj))

        // //update games -- first  delete unchecked games
        // promises.push(this.props.games.filter(game => game.picnicId === picnicId)
        //     .filter(game => !this.state.selectedGames.includes(game.gameId))
        //     .map(game =>
        //         this.props.deleteGames(game.id)
        //     ))
        // //then select new checked item and add them
        // const gamesArray = this.props.games.filter(game => game.picnicId === picnicId)
        //     .map(game => game.gameId)
        // this.state.selectedGames.filter(gameId => !gamesArray.includes(gameId))
        //     .map(gameId =>
        //         //console.log(gameId)
        //         this.props.createGames(
        //             CreateObject.GamesObj(
        //                 parseInt(picnicId), parseInt(gameId), false))

        //     )
        promises.push(this.updateArray(this.props.games,
            this.state.selectedGames, "gameId", "deleteGames", "createGames", "GamesObj", false))
        promises.push(this.updateArray(this.props.items,
            this.state.selectedItems, "itemId", "deleteItems", "createItems", "ItemsObj", false))
        promises.push(this.updateArray(this.props.foodItems,
            this.state.selectedFoodItems, "foodItemName", "deleteFoodItems", "createFoodItems", "FoodItemsObj", true))
        Promise.all(promises).then(this.props.setStateOfAll)
    }

    updateArray = (dbArray, selectedArray, idName, deleteAPIFn, createAPI, creatObj, isStr) => {
        let promises = []
        const PicnicId = parseInt(sessionStorage.getItem("picnic"))

        //update games -- first  delete unchecked games
        //Avalable in database and ot in selected array
        promises.push(dbArray.filter(obj => obj.picnicId === PicnicId)
            .filter(obj => !selectedArray.includes(obj[idName]))
            .map(obj =>
                     this.props[deleteAPIFn](obj.id)
            ))
        //then select new checked item and add them
        const gamesArray = dbArray.filter(obj => obj.picnicId === PicnicId)
            .map(obj => obj[idName])
        promises.push(selectedArray.filter(id => !gamesArray.includes(id))
            .map(newObjItem =>
                //console.log(gameId)
                this.props[createAPI](
                    CreateObject[creatObj](
                        PicnicId, isStr ? newObjItem : parseInt(newObjItem), false))

            ))
        return promises
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
                                        checked={UpdateArray.CheckArray(game.id, this.state.selectedGames)}
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

                    <div className="form-group">
                        <label htmlFor="items">Select items</label>
                        <div>
                            {this.props.itemList.map(item => (
                                <div key={item.id}>
                                    <input type="checkbox"
                                        name={item.itemName}
                                        id={item.id}
                                        checked={UpdateArray.CheckArray(item.id, this.state.selectedItems)}
                                        onChange={this.handleCheckBoxChangeItems} />
                                    <Label for={item.itemName}>{item.itemName}</Label>
                                </div>
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
                        label="Add New Food Items :" />

                    {this.state.selectedFoodItems.map(foodItem =>
                        <div key={foodItem}>
                            <input type="checkbox"
                                name={foodItem}
                                id={foodItem}
                                checked={UpdateArray.CheckArray(foodItem, this.state.selectedFoodItems)}
                                onChange={this.handleCheckBoxChangeFoodItems} />
                            <Label for={foodItem}>{foodItem}</Label>
                        </div>
                    )}

                    <Button caption="Update"
                        onClickFunction={this.UpdateForm} />
                </form>
            </React.Fragment>
        )
    }
}
export default EditPicnic