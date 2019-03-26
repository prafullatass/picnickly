import React, { Component } from "react"
import { Card, CardFooter, CardText } from "reactstrap"

import Button from "../reusableComponents/Button";
import ModelNewFriend from "./NewFriend";


class Friends extends Component {

    // deleteFriend=()=>{
    //     if(window.confirm("No more friend Now ?"))
    //         this.props.deleteFriend()
    // }

    render() {
        console.log(this.state)
        return (
            <div>
                <ModelNewFriend users = {this.props.users}
                friendsList={this.props.friendsList}
                createFriends={this.props.createFriends} />
                {this.props.friendsList.map(friend =>
                    <Card body className="cardSize"
                        id={friend.friendId} key={friend.friendId}>
                        <CardText> {friend.nickName}{friend.pics}</CardText>
                        <CardFooter>
                            <Button
                                className="footerButton CommonButton submitButton"
                                onClickFunction={() => this.props.history.push(`/friends/${friend.friendId}/edit`)}
                                caption="Edit"
                            />
                            <Button
                                id={friend.friendId}
                                className="footerButton CommonButton delButton"
                                onClickFunction={this.deleteFriend}
                                caption="Delete" />
                        </CardFooter>
                    </Card>
                )}
            </div >
        )
    }
}

export default Friends