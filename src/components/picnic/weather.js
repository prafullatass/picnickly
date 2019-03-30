import React, { Component } from "react"
import {
    Card, Button, CardImg, CardTitle, CardText,
    CardSubtitle, CardBody
} from "../../icons";

class aa extends Component {
    render() {
        return (
            <Card>
                <CardImg  src={this.props.weatherObj.icon} alt="Card image cap" />
                <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                    <Button>Button</Button>
                </CardBody>
            </Card>

        )

    }

}

export default aa


