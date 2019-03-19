import React, { Component } from "react"
import Login from "./Login"
import Register from "./Register";

class LoginOrRegister extends Component {
    state = {
        login: true
    }

    changeState = () => {
        this.setState({ login: !this.state.login })
    }
    render() {

        return (
            <React.Fragment>
                {this.state.login ? (
                    <Login {...this.props}
                    changeState = { this.changeState} />
                ) : (
                        <Register {...this.props}
                        changeState = { this.changeState} />
                    )}
            </React.Fragment>
        )
    }
}

export default LoginOrRegister