import React, { Component } from "react"
import { Card, Button, CardTitle, CardText, CardFooter } from "reactstrap"

class Picnic extends Component {
    confirmCancelPicnic = (evt) => {
        window.confirm("Cancel the Picnic ? ")
            this.props.cancelPicnic(parseInt(evt.target.id))
    }

    render() {
        console.log("Picnic")

        return (
            <div className="Container">
                {this.props.picnics.map(picnic =>
                    <Card body inverse color="info" className="cardSize"
                    id = {picnic.id}>
                        <CardTitle>On {picnic.picnicDate} </CardTitle>
                        <CardText> At {picnic.parkName}</CardText>
                        <CardText>Address : {picnic.address}</CardText>
                        <CardFooter>
                            <Button color="info" size="sm"
                            className = "footerButton"
                            onClick={() => this.props.history.push(`/picnics/${picnic.id}/edit`)}
                            >Edit </Button>
                            <Button color="danger" size="sm"
                            id = {picnic.id}
                            className = "footerButton" onClick={this.confirmCancelPicnic}>Cancel</Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
        )
    }
}

export default Picnic