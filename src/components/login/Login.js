import React, { Component } from "react"
import UserManager from "../../ResourceManager/userManager";
import {
    Container, Col, Form,
    FormGroup, Label
  } from 'reactstrap';
import "./login.css"


export default class Login extends Component {
    // Set initial state
    state = {
        password: "",
        username: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = e => {
        e.preventDefault()
        if (this.state.username && this.state.password) {
            UserManager.searchUP(this.state.username, this.state.password)
            .then(user => {
                    if (!user.length) {
                        alert("Wrong username or password!")
                    } else {
                        sessionStorage.setItem("credentials", parseInt(user[0].id))
                        this.props.setAuth()
                    }
                }
            )
        } else {
            alert("Please Fill Out Form 😬!")
        }
    }

    render() {
        return (
            // <form className="loginForm">
            //     <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            //     <label htmlFor="inputUsername">Username</label>
        <Container className="Login">
        <h2>Sign In</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Username</Label>

                <input
                    onChange={this.handleFieldChange}
                    type="username"
                    id="username"
                    placeholder={` Something Cool`}
                    required=""
                    autoFocus=""
                />
            {/* <label htmlFor="inputPassword">Password</label> */}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>

                <input
                    onChange={this.handleFieldChange}
                    type="password"
                    id="password"
                    placeholder={` Don't tell!`}
                    required=""
                />
                </FormGroup>
          </Col>
                <button type="submit" onClick={this.handleLogin}>
                    Sign in
                </button>

                <button type="submit" onClick={() => this.props.changeState()}>
                    Register
                </button>

        </Form>
      </Container>

        )
    }
}
