import React, {Component} from "react"
import { Route } from "react-router-dom"

class ApplicationViews extends Component {
    render () {
        console.log("AT last see me")
        return (
            <Route exact path="/events" render={(props) => {
                    return (
                        console.log("sdjk")
                    )
              }} />
        )
    }
}

export default ApplicationViews