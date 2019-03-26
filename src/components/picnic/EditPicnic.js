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
import UsefulFn from "../../Modules/UsalfulFn";
import Validation from "../../Modules/Validation";
import { TabContent, TabPane, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import classnames from 'classnames';

import "./picnic.css"

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
            promises.push(this.getDataForArray(GamesManager, "selectedGames", "myGameId"))
            promises.push(this.getDataForArray(ItemsManager, "selectedItems", "itemListId"))
            promises.push(this.getDataForArray(FoodItemsManager, "selectedFoodItems", "foodItemName"))
            Promise.all(promises).then(() => {
                this.setState(fetchedObj)
            })
        })
    }


    getDataForArray = (objManager, arrayName, idName) => {
        return objManager.GETALLPICNICDATA(parseInt(sessionStorage.getItem("picnic")))
        .then(allData => {
            console.log(allData)
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
            const newFoodItem = UsefulFn.CapitalizeFirstLetter(event.target.value)
            if (Validation.Duplicate(newFoodItem, this.state.selectedFoodItems) === false) {
                newFoodList.push(newFoodItem)
                this.setState({
                    selectedFoodItems: newFoodList
                })
            }
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
        promises = promises.concat(this.updateArray(this.props.games,
            this.state.selectedGames, "myGameId", "deleteGames", "createGames", "GamesObj", false))
        promises = promises.concat(this.updateArray(this.props.items,
            this.state.selectedItems, "itemListId", "deleteItems", "createItems", "ItemsObj", false))
        promises = promises.concat(this.updateArray(this.props.foodItems,
            this.state.selectedFoodItems, "foodItemName", "deleteFoodItems", "createFoodItems", "FoodItemsObj", true))
        Promise.all(promises).then(() => {
            this.props.setStateOfAll()
            this.props.history.push("/")
        })
    }

    updateArray = (dbArray, selectedArray, idName, deleteAPIFn, createAPI, creatObj, isStr) => {
        let promises = []
        const PicnicId = parseInt(sessionStorage.getItem("picnic"))
        //update games -- first  delete unchecked games
        //Avalable in database and ot in selected array
        dbArray.filter(obj => obj.picnicId === PicnicId)
            .filter(obj => !selectedArray.includes(obj[idName]))
            .map(obj =>
                promises.push(this.props[deleteAPIFn](obj.id))
            )
            Promise.all(promises).then(() => {
                //then select new checked item and add them
                const gamesArray = dbArray.filter(obj => obj.picnicId === PicnicId)
                    .map(obj => obj[idName])
                selectedArray.filter(id => !gamesArray.includes(id))
                    .map(newObjItem =>
                        //console.log(gameId)
                        promises.push(this.props[createAPI](
                            CreateObject[creatObj](
                                PicnicId, isStr ? newObjItem : parseInt(newObjItem), false))

                        ))
            })

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
                        divClass="date"
                        label="Picnic Date :"
                        value={this.state.picnicDate} />

                    <h5><Badge color="info" pill>Things To Pack in Your Picnic Basket</Badge></h5>
                    <div className="TabContainer">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >Games
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Necessary Items
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
                                        <label htmlFor="allData">Select Games : </label>
                                        <ModelNewObj createNewObject={this.props.createMyGame}
                                            buttonLabel="New Game"
                                            label="New Game : "
                                            createObjFn={CreateObject.MyGamesObj}
                                            list={this.props.myGames.filter(game =>
                                                game.userId === parseInt(sessionStorage.getItem("credentials"))
                                            ).map(game => game.gameName)}
                                        />
                                    </div>
                                    <div className="insideTab">
                                        {this.props.myGames.filter(game =>
                                            game.userId === parseInt(sessionStorage.getItem("credentials")))
                                            .sort((a, b) => (a.gameName < b.gameName) ? -1 : 1)
                                            .map(game => (
                                                <div key={game.id}>
                                                    <input type="checkbox"
                                                        name={game.gameName}
                                                        id={game.id}
                                                        checked={UpdateArray.CheckArray(game.id, this.state.selectedGames)}
                                                        onChange={this.handleCheckBoxChangeGames} />
                                                    <Label for={game.gameName}
                                                    >{game.gameName} </Label>
                                                </div>
                                            )
                                            )}
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="2">

                                <div className="form-group">
                                    <div className="inlineAll">
                                        <label htmlFor="items">Select Items :</label>
                                        <ModelNewObj createNewObject={this.props.createItemsList}
                                            buttonLabel="New Item"
                                            label="Name of Item : "
                                            createObjFn={CreateObject.ItemListObj}
                                            list={this.props.itemList.map(item => item.itemName)}
                                        />
                                    </div>
                                    <div className="insideTab">
                                        {this.props.itemList
                                            .sort((a, b) => (a.itemName < b.itemName) ? -1 : 1)
                                            .map(item => (
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

                            </TabPane>
                            <TabPane tabId="3">
                                {/* <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <InputReact addon type="checkbox"
                                            aria-label="Food item"
                                            onKeyDown={this.onKeyPressEvent} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <InputReact placeholder="Enter Food Item" />
                                </InputGroup> */}

                                <Input id="foodItem" onKeyPressEvent={this.onKeyPressEvent}
                                    type="text"
                                    placeholder="Press Enter to add New "
                                    label="Food carrying :" />

                                {this.state.selectedFoodItems.map(foodItem =>
                                    <div key={foodItem} className="insideTab">
                                        <input type="checkbox"
                                            name={foodItem}
                                            id={foodItem}
                                            checked={UpdateArray.CheckArray(foodItem, this.state.selectedFoodItems)}
                                            onChange={this.handleCheckBoxChangeFoodItems} />
                                        <Label for={foodItem}>{foodItem}</Label>
                                    </div>
                                )}
                            </TabPane>
                        </TabContent>
                    </div>
                    <div className="btnContainer">
                        <Button caption="Update" className="CommonButton submitButton "
                            onClickFunction={this.UpdateForm} />
                        <Button caption="Cancel" className="cancelButton CommonButton"
                            onClickFunction={() => this.props.history.push("/")} />
                    </div>
                </form>
            </React.Fragment>
        )
    }
}
export default EditPicnic