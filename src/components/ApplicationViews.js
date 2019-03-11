import React, { Component } from "react"
import { Route } from "react-router-dom"
import PicnicManager from "../ResourceManager/PicnicManager";
import Picnic from "./picnic/picnic";
import GamesManager from "../ResourceManager/GamesManager";
import FoodItemsManager from "../ResourceManager/FoodItemsManager";
import ItemsManager from "../ResourceManager/ItemsManager";
import MyGamesManger from "../ResourceManager/MyGamesManager";

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
        promises.push(
            MyGamesManger.GETALL().then(myGames =>
                new_state.myGames = myGames
            )
        )
        Promise.all(promises)
            .then(() =>
                this.setState(new_state))
    }

    render() {
        console.log(this.state)
        return (
            <Route exact path="/picnic" render={(props) => {
                return <Picnic picnicData={this.state.picnic} />
            }} />
        )
    }
}

export default ApplicationViews