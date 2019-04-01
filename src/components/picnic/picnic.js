import React, { Component } from "react"
import { Card, CardTitle, CardText, CardFooter } from "reactstrap"
import "./picnic.css"
import Button from "../reusableComponents/Button";

class Picnic extends Component {
    confirmCancelPicnic = (evt) => {
        if (window.confirm("Cancel the Picnic ? "))
            this.props.cancelPicnic(parseInt(evt.target.id))
    }

    render() {
        const dt = new Date().setHours(0, 0, 0, 0)
        console.log("Picnic", dt)
        return (
            <div className="Container">
                {this.props.picnics.filter(picnic =>
                    picnic.userId === parseInt(sessionStorage.getItem("credentials")))
                    .filter(picnic =>
                        new Date((picnic.picnicDate).replace("-", "/").replace("-", "/")) >= dt)
                    .sort((a, b) => new Date(a.picnicDate) < new Date(b.picnicDate) ? -1 : 1)
                    .map(picnic =>
                        <Card body inverse color="info" className="cardSize"
                            id={picnic.id} key={picnic.id}>
                            <CardTitle>On {picnic.picnicDate} </CardTitle>
                            <CardText> At {picnic.parkName}, {picnic.address}</CardText>
                            <CardFooter>
                                <Button
                                    className="footerButton CommonButton submitButton"
                                    onClickFunction={() => this.props.history.push(`/picnics/${picnic.id}/edit`)}
                                    caption="Edit"
                                />
                                <Button
                                    id={picnic.id}
                                    className="footerButton CommonButton delButton"
                                    onClickFunction={this.confirmCancelPicnic}
                                    caption="Cancel" />
                                <Button
                                    className="footerButton CommonButton packButton"
                                    onClickFunction={() => this.props.history.push(`/picnics/${picnic.id}/pack`)}
                                    caption="Start Packing" />
                            </CardFooter>
                        </Card>
                    )}
            </div>
        )
    }
}

export default Picnic