import React, { Component } from "react"
class FriendList extends Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.friendsList.map(friend =>
                        <li>{friend.pics} {friend.nickName}
                        </li>
                    )
                    }</ul>
            </div>
        )
    }
}

export default FriendList