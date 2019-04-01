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
import EditPicnic from "./picnic/EditPicnic";
import Pack from "./picnic/Pack";
import "./picnic/picnic.css"
import HistoryPicnic from "./picnic/History";
import Friends from "./friends/friends";
import FriendsManager from "../ResourceManager/FriendsManager";
import UserManager from "../ResourceManager/userManager";
import PicnicFriendsManager from "../ResourceManager/PicnicFriendsManager";
import Items from "./smallComponents/items";
import MyGames from "./smallComponents/myGames";
import Invitataions from "./picnic/Invitataions";
class ApplicationViews extends Component {
    state = {
        picnic: [],
        games: [],
        foodItems: [],
        items: [],
        itemList: [],
        myGames: [],
        friendsList: [],
        users: [],
        picnicFriends: []
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
            ))
        promises.push(FriendsManager.GETALL()
            .then(list => new_state.friendsList = this.makeFriendsList(list)))
        promises.push(UserManager.GETALL().then(
            users => new_state.users = users))
        promises.push(PicnicFriendsManager.GETALL().then(
            picnicFriends => new_state.picnicFriends = picnicFriends))
        //Object.assign addes two objects
        promises.push(this.setStateOfAll("yes").then(restObj =>
            Object.assign(new_state, restObj)))

        Promise.all(promises)
            .then(() =>
                this.setState(new_state))
    }

    setStateOfAll = (compDidMount) => {

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
        return Promise.all(promises)
            .then(() => {
                if (compDidMount === "yes")
                    return (new_state)
                else
                    this.setState(new_state)
            })
    }

    makeFriendsList = (list) => {
        const uid = parseInt(sessionStorage.getItem("credentials"))
        return (list.filter(friend => friend.userId === uid))
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
    createPicnicFriend = (frndObj) => {
        return PicnicFriendsManager.POST(frndObj)
    }
    createFriends = (frndObj) => {
        return FriendsManager.POST(frndObj)
            .then(() => FriendsManager.GETALL()
                .then(friendsList => this.setState({ friendsList: friendsList })
                ))
    }

    updatePicnic = (picObj) => {
        return PicnicManager.PUT(picObj)
    }
    deleteGames = (id) => {
        return GamesManager.DELETE(id)
    }
    deleteItems = (id) => {
        return ItemsManager.DELETE(id)
    }
    deleteFoodItems = (id) => {
        return FoodItemsManager.DELETE(id)
    }
    deleteItemList = (id) => {
        return ItemsListManager.DELETE(id)
            .then(() => ItemsListManager.GETALL()
                .then(itemList => this.setState({ itemList: itemList })
                ))
    }
    deleteMyGame = (id) => {
        return MyGamesManger.DELETE(id)
            .then(() => MyGamesManger.GETALL()
                .then(myGames => this.setState({ myGames: myGames })
                ))
    }
    deleteFriend = (id) => {
        return FriendsManager.DELETE(id)
            .then(() => FriendsManager.GETALL()
                .then(friendsList => this.setState({ friendsList: friendsList })
                ))
    }
    patchGames = (obj) => {
        return GamesManager.PATCH(obj)
    }
    patchItems = (obj) => {
        return ItemsManager.PATCH(obj)
    }
    patchFoodItems = (obj) => {
        return FoodItemsManager.PATCH(obj)
    }

    createMyGame = (myGameObj) => {
        MyGamesManger.POST(myGameObj).then(() =>
            MyGamesManger.GETALL().then(myGames =>
                this.setState({
                    myGames: myGames
                })
            )
        )
    }

    createItemsList = (myItemObj) => {
        ItemsListManager.POST(myItemObj).then(() =>
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
        promises.push(this.multipleDel(id, "games", GamesManager))
        promises.push(this.multipleDel(id, "items", ItemsManager))
        promises.push(this.multipleDel(id, "foodItems", FoodItemsManager))

        Promise.all(promises).then(this.setStateOfAll)
    }

    editMyGame = (obj) => {
        return MyGamesManger.PUT(obj).then(() => {
            MyGamesManger.GETALL().then(myGames =>
                this.setState({
                    myGames: myGames
                })
            )
        })
    }

    editItemsList = (obj) => {
        return ItemsListManager.PUT(obj).then(() => {
            ItemsListManager.GETALL().then(itemList =>
                this.setState({
                    itemList: itemList
                })
            )
        })
    }

    confirmFriendsPicnic = (id, picnicId) => {
        PicnicManager.GET(parseInt(picnicId)).then(picnic => {
            picnic.userId = parseInt(sessionStorage.getItem("credentials"))
            delete picnic.id
            PicnicManager.POST(picnic).then(() => {
                PicnicFriendsManager.PATCH({
                    id: parseInt(id),
                    confirmed: true
                }).then(() => {
                    PicnicManager.GETALL().then(picnic =>
                        PicnicFriendsManager.GETALL().then(picnicFriends =>
                            {
                                this.setState({
                                    picnic: picnic,
                                    picnicFriends: picnicFriends
                                })
                                this.props.CheckSpinner()
                            })
                    )
                })
            })
        })
    }



    render() {
        console.log("render -- ApplicationViews")
        console.log(this.state)

        return (
            <div className="coverImage">

                <Route exact path="/" render={(props) => {
                    return <Picnic picnics={this.state.picnic}
                        cancelPicnic={this.cancelPicnic}
                        {...props}
                    />
                }} />
                <Route exact path="/past" render={(props) => {
                    return <HistoryPicnic picnics={this.state.picnic}
                        cancelPicnic={this.cancelPicnic}
                        {...props}
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
                        friendsList={this.state.friendsList}
                        users={this.state.users}
                        createPicnicFriend={this.createPicnicFriend}
                        createFriends={this.createFriends}
                        {...props}
                    />
                }} />

                <Route exact path="/picnics/:picnicId(\d+)/edit" render={(props) => {
                    return <EditPicnic {...props}
                        myGames={this.state.myGames}
                        games={this.state.games}
                        itemList={this.state.itemList}
                        items={this.state.items}
                        setStateOfAll={this.setStateOfAll}
                        createMyGame={this.createMyGame}
                        createItemsList={this.createItemsList}
                        updatePicnic={this.updatePicnic}
                        deleteItems={this.deleteItems}
                        deleteFoodItems={this.deleteFoodItems}
                        deleteGames={this.deleteGames}
                        createItems={this.createItems}
                        createFoodItems={this.createFoodItems}
                        createGames={this.createGames}
                        foodItems={this.state.foodItems} />
                }} />

                <Route exact path="/picnics/:picnicId(\d+)/pack" render={(props) => {
                    return <Pack {...props}
                        myGames={this.state.myGames}
                        games={this.state.games}
                        itemList={this.state.itemList}
                        items={this.state.items}
                        foodItems={this.state.foodItems}
                        patchGames={this.patchGames}
                        patchItems={this.patchItems}
                        patchFoodItems={this.patchFoodItems}
                        setStateOfAll={this.setStateOfAll}
                    />
                }} />

                <Route exact path="/friends/New" render={(props) => {
                    return <Friends friendsList={this.state.friendsList}
                        users={this.state.users}
                        createFriends={this.createFriends}
                        deleteFriend={this.deleteFriend}
                    />

                }} />
                <Route exact path="/items" render={(props) => {
                    return <Items itemList={this.state.itemList}
                        deleteItemList={this.deleteItemList}
                        createItemsList={this.createItemsList}
                        editItemsList={this.editItemsList}
                        {...props}
                    />
                }} />
                <Route exact path="/mygames" render={(props) => {
                    return <MyGames myGames={this.state.myGames}
                        deleteMyGame={this.deleteMyGame}
                        createMyGame={this.createMyGame}
                        editMyGame={this.editMyGame}
                        {...props}
                    />
                }} />

                <Route exact path="/invitations" render={(props) => {
                    return <Invitataions picnicFriends={this.state.picnicFriends}
                        users={this.state.users}
                        picnic={this.state.picnic}
                        confirmFriendsPicnic={this.confirmFriendsPicnic}
                        createMyGame={this.createMyGame}
                        editMyGame={this.editMyGame}
                        {...props}
                    />
                }} />
            </div>
        )
    }
}

export default ApplicationViews