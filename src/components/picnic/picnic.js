import React, { Component } from "react"
import { Card, Button, CardTitle, CardText, CardFooter } from "reactstrap"
class Picnic extends Component {
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
                            <Button color="info" size="sm" className = "footerButton">Edit </Button>
                            <Button color="danger" size="sm" className = "footerButton">Delete</Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
        )
    }
}

export default Picnic