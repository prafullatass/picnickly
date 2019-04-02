import React, { Component } from "react"
import { Card, CardTitle, CardImg, CardImgOverlay } from "reactstrap"
import Button from "../reusableComponents/Button";

import "./inv.css"
class Invitataions extends Component {
    getpicnic = (id) => {
        return this.props.picnic.find(picnic =>
            picnic.id === id)
    }

    getid = (evt) => {
        const id = parseInt(evt.target.id)
        debugger
        const _this = this
        const picnic = _this.props.picnicFriends.find(picnicFriend =>
            picnicFriend.id === id)
        this.props.confirmFriendsPicnic(id, picnic.picnicId)
    }

    render() {
        return (
            <div className="Container">
                {this.props.picnicFriends.filter(picnicFriend =>
                    picnicFriend.friendId === parseInt(sessionStorage.getItem("credentials"))
                    && picnicFriend.confirmed === false)
                    .map(picnicFriend =>
                        <Card inverse className="InvCard topAlign"
                            id={picnicFriend.id} key={picnicFriend.id}>
                            <CardImg className="InvCard"
                                src="http://static.yoovite.com/images/events/thumb/picnic2_thumb.jpg"></CardImg>
                            <CardImgOverlay>
                                <CardTitle className="invText"> <span className="title"> Picnic in the Park </span><br />
                                    From <br />
                                    {this.props.users.find(user =>
                                        user.id === this.getpicnic(picnicFriend.picnicId).userId).firstName}
                                    <br />Where <br />At {this.getpicnic(picnicFriend.picnicId).parkName}
                                    <br /> {this.getpicnic(picnicFriend.picnicId).address}
                                    <br />When <br />{this.getpicnic(picnicFriend.picnicId).picnicDate}
                                </CardTitle>

                                <Button
                                    className="footerButton CommonButton submitButton"
                                    caption="Confirm"
                                    id={picnicFriend.id}
                                    onClickFunction={this.getid}
                                />
                                <Button
                                    id={picnicFriend.id}
                                    className="footerButton CommonButton delButton"
                                    onClickFunction={this.props.confirmCancelPicnic}
                                    caption="Cancel" />

                            </CardImgOverlay>
                        </Card>
                    )}
            </div>
        )
    }
}

export default Invitataions