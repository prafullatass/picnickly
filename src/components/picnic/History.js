import React, { Component } from "react"
import { Card,  CardTitle, CardText, CardFooter } from "reactstrap"
import Button from "../reusableComponents/Button";

class HistoryPicnic extends Component {
    confirmCancelPicnic = (evt) => {
        window.confirm("Cancel the Picnic ? ")
        this.props.cancelPicnic(parseInt(evt.target.id))
    }

    render() {
        const dt = new Date().setHours(0, 0, 0, 0)
        return (
            <div className="Container">
                {this.props.picnics.filter(picnic =>
                picnic.userId === parseInt(sessionStorage.getItem("credentials")))
                .filter(picnic =>
                    new Date((picnic.picnicDate).replace("-", "/").replace("-", "/")) < dt)
                    .sort((a, b) => new Date(a.picnicDate) < new Date(b.picnicDate) ? 1 : -1)
                    .map(picnic =>
                        <Card body inverse color="info" className="cardSize"
                            id={picnic.id} key={picnic.id}>
                            <CardTitle>On {picnic.picnicDate} </CardTitle>
                            <CardText> At {picnic.parkName}</CardText>
                            <CardText>Address : {picnic.address}</CardText>
                            <CardFooter>
                                <Button
                                    className="footerButton CommonButton submitButton"
                                    onClickFunction={() => this.props.history.push(`/picnics/${picnic.id}/pack`)}
                                    caption="Details"
                                />
                                <Button
                                    id={picnic.id}
                                    className="footerButton CommonButton delButton"
                                    onClickFunction={this.confirmCancelPicnic}
                                    caption="Cancel" />

                            </CardFooter>
                        </Card>
                    )}
            </div>
        )
    }
}

export default HistoryPicnic