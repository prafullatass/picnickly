import React, { Component } from "react"
import { Table } from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';

import Button from "../reusableComponents/Button";
import ModelNewFriend from "./NewFriend";

import "../picnic/picnic.css"

class Friends extends Component {

    deleteFriend=(evt)=>{
        if(window.confirm("No more friend Now ?"))
            this.props.deleteFriend(evt.target.id)
    }

    render() {
        return (
            <div>
                <div className="Container">
                    <div className="inlineAll center">
                        <label htmlFor="items">Add new Friend </label>
                        <ModelNewFriend users={this.props.users}
                            friendsList={this.props.friendsList}
                            createFriends={this.props.createFriends} />
                    </div>
                    <Table hover size="sm" style={{ backgroundColor: "white" }}>
                        <tbody>
                            {this.props.friendsList.map((friend,idx) =>
                                <tr id={friend.friendId} key={idx}>
                                    <td className="inlineAll">
                                        <Avatar alt="My Friend" src={friend.pic[0]} />
                                        {friend.nickName}
                                    </td>
                                    <td>
                                        <Button
                                            className="footerButton CommonButton submitButton"
                                            //onClickFunction={() => this.props.history.push(`/friends/${friend.friendId}/edit`)}
                                            caption="Edit"
                                        />
                                    </td>
                                    <td>
                                        <Button
                                            id={friend.id}
                                            className="footerButton CommonButton delButton"
                                            onClickFunction={this.deleteFriend}
                                            caption="Delete" />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div >
        )
    }
}

export default Friends