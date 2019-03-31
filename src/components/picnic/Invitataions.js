import React, { Component } from "react"
import { Card, CardTitle, CardText, CardFooter } from "reactstrap"
import Button from "../reusableComponents/Button";

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
                        <Card body inverse color="info" className="cardSize"
                            id={picnicFriend.id} key={picnicFriend.id}>
                            <CardTitle> {this.props.users.find(user =>
                                user.id === this.getpicnic(picnicFriend.picnicId).userId).firstName} calling for picnic </CardTitle>
                            <CardText> At {this.getpicnic(picnicFriend.picnicId).parkName}</CardText>
                            <CardText>On : {this.getpicnic(picnicFriend.picnicId).picnicDate}</CardText>
                            <CardFooter>
                                <Button
                                    className="footerButton CommonButton submitButton"
                                    caption="Confirmed"
                                    id={picnicFriend.id}
                                    onClickFunction={this.getid}
                                />
                                <Button
                                    id={picnicFriend.id}
                                    className="footerButton CommonButton delButton"
                                    onClickFunction={this.props.confirmCancelPicnic}
                                    caption="Cancel" />

                            </CardFooter>
                        </Card>
                    )}
            </div>
        )
    }
}

export default Invitataions