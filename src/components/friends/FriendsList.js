import React, { Component } from "react"
class FriendList extends Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.friendsList.map(friend =>
                        <li>{friend.nickName}{friend.pics}
                        </li>
                    )
                    }</ul>
            </div>
        )
    }
}

export default FriendList