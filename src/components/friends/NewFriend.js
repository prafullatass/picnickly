import React, { Component } from "react"
import UserManager from "../../ResourceManager/userManager";
import FriendsManager from "../../ResourceManager/FriendsManager";
class NewFriend extends Component {

    state = {
        friendsList: [],
        users: []
    }

    componentDidMount() {
        const newObj = {}
        const promises = []
        promises.push(FriendsManager.GETALL()
            .then(list => newObj.friendsList = this.makeFriendsList(list)))
        promises.push(UserManager.GETALL().then(list => newObj.users = list))
        Promise.all(promises).then(() => this.setState({ state: newObj }))
    }
    makeFriendsList = (list) => {
        const uid = parseInt(sessionStorage.getItem("credentials"))
        return (list.filter(friend => friend.userId === uid))
    }

    render() {
        console.log(this.state)
        return (
            <ul>
                {this.state.friendsList.map(friend =>
                    <li>{friend.nickName}{friend.pics}
                    </li>
                )
                }</ul>
        )
    }
}

export default NewFriend