import React, { Component } from "react"
import UserManager from "../../ResourceManager/userManager";
import {
    Container, Col, Form,
    FormGroup, Label
  } from 'reactstrap';
import "./login.css"
import UsefulFn from "../../Modules/UsalfulFn";

export default class Register extends Component {
    // Set initial state
    state = {
        password: "",
        username: "",
        firstName:"",
        lastName:""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleRegister = e => {
        e.preventDefault()
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            firstName: UsefulFn.CapitalizeFirstLetter(this.state.firstName),
            lastName: UsefulFn.CapitalizeFirstLetter(this.state.lastName),
        }
        if (this.state.username && this.state.password) {
            UserManager.searchUsername(this.state.username)
            .then(users => {
                if (users.length) {
                    alert(`Username ${this.state.username} already exits!`)
                } else {
                    UserManager.POST(newUser)
                    .then(user => {
                        sessionStorage.setItem("credentials", parseInt(user.id))
                        this.props.setAuth()
                    })
                }
            })
        } else {
            alert("Please Fill Out Form 😬!")
        }
    }


    render() {
        return (
        <Container className="Login">
        <h2>Register</h2>
        <Form className="form">
        <Col>
            <FormGroup>
              <Label>First Name</Label>

                <input
                    onChange={this.handleFieldChange}
                    type="firstName"
                    id="firstName"
                    placeholder={` First Name `}
                    required=""
                    autoFocus="true"
                />
            {/* <label htmlFor="inputPassword">Password</label> */}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Last Name</Label>

                <input
                    onChange={this.handleFieldChange}
                    type="lastName"
                    id="lastName"
                    placeholder={` Last Name`}
                    required=""
                    autoFocus=""
                />
            {/* <label htmlFor="inputPassword">Password</label> */}
            </FormGroup>
          </Col>
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

                <button type="submit" onClick={this.handleRegister}>
                    Register
                </button>
                <button type="submit" onClick={() => this.props.changeState()}>
                    Cancel
                </button>

        </Form>
      </Container>

        )
    }
}
