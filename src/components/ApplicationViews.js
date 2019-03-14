import React, { Component } from "react"
import { Route } from "react-router-dom"
import PicnicManager from "../ResourceManager/PicnicManager";
import Picnic from "./picnic/picnic";
import GamesManager from "../ResourceManager/GamesManager";
import FoodItemsManager from "../ResourceManager/FoodItemsManager";
import ItemsManager from "../ResourceManager/ItemsManager";
import MyGamesManger from "../ResourceManager/MyGamesManager";
import ItemsListManager from "../ResourceManager/ItemListManager";
import PicnicForm from "./picnic/NewPicnic";

class ApplicationViews extends Component {
    state = {
        picnic: [],
        games: [],
        foodItems: [],
        items: [],
        itemList: [],
        myGames: []
    }

    componentDidMount() {

        let promises = []
        let new_state = {}
        promises.push(
            ItemsListManager.GETALL().then(itemList =>
                new_state.itemList = itemList
            )
        )
        promises.push(
            MyGamesManger.GETALL().then(myGames =>
                new_state.myGames = myGames
            )
        )
        Promise.all(promises)
            .then(() =>
                this.setState(new_state))
        this.setStateOfAll()
    }
    setStateOfAll = () => {

        let promises = []
        let new_state = {}

        promises.push(
            PicnicManager.GETALL().then(picnicData =>
                new_state.picnic = picnicData
            )
        )
        promises.push(
            GamesManager.GETALL().then(games =>
                new_state.games = games
            )
        )
        promises.push(
            FoodItemsManager.GETALL().then(foodItems =>
                new_state.foodItems = foodItems
            )
        )
        promises.push(
            ItemsManager.GETALL().then(items =>
                new_state.items = items
            )
        )
        Promise.all(promises)
            .then(() =>
                this.setState(new_state))
    }
    createPicnic = (picObj) => {
        return PicnicManager.POST(picObj)
            .then(res => sessionStorage.setItem("picnic", res.id))
    }
    createGames = (gamesObj) => {
        return GamesManager.POST(gamesObj)
    }
    createItems = (itemsObj) => {
        return ItemsManager.POST(itemsObj)
    }
    createFoodItems = (foodObj) => {
        return FoodItemsManager.POST(foodObj)
    }

    createMyGame = (myGameObj) => {
        MyGamesManger.POST(myGameObj).then(
            MyGamesManger.GETALL().then(myGames =>
                this.setState({
                    myGames: myGames
                })
            )
        )
    }
    createItemsList = (myItemObj) => {
        ItemsListManager.POST(myItemObj).then(
            ItemsListManager.GETALL().then(itemList =>
                this.setState({
                    itemList: itemList
                })
            )
        )
    }

    multipleDel = (id, stateArray, managerName) => {
         return this.state[stateArray].filter(game => game.picnicId === id)
        .map(game => managerName.DELETE(game.id))
    }

    cancelPicnic = (id) => {
        let promises = []

        promises.push(PicnicManager.DELETE(id))
        debugger
        promises.push(this.multipleDel(id,"games", GamesManager))
        promises.push(this.multipleDel(id,"items", ItemsManager))
        promises.push(this.multipleDel(id,"foodItems", FoodItemsManager))

        Promise.all(promises).then(this.setStateOfAll)

     }
    render() {
        console.log(this.state)

        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <Picnic picnics={this.state.picnic}
                        cancelPicnic={this.cancelPicnic}
                    />
                }} />

                <Route exact path="/new" render={(props) => {
                    return <PicnicForm picnicData={this.state.picnic}
                        myGames={this.state.myGames}
                        games={this.state.games}
                        itemList={this.state.itemList}
                        items={this.state.items}
                        createPicnic={this.createPicnic}
                        createItems={this.createItems}
                        createFoodItems={this.createFoodItems}
                        createGames={this.createGames}
                        setStateOfAll={this.setStateOfAll}
                        createMyGame={this.createMyGame}
                        createItemsList={this.createItemsList}
                        {...props}
                    />
                }} />
            </React.Fragment>
        )

    }
}

export default ApplicationViews