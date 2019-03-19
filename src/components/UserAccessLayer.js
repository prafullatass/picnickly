import React, { Component } from "react"
//import Nav from "./nav/Nav"
import ApplicationViews from "./ApplicationViews"
import UserManager from "../ResourceManager/userManager";
import NavBar from "./nav/Nav";

export default class UserAccessLayer extends Component {
  state = {
    activeUser: {}
  }

  componentDidMount() {
    UserManager.GET(this.activeUserId())
    .then(activeUser =>{
      this.setState({ activeUser: activeUser })
    }
    )
  }
  activeUserId = () => parseInt(sessionStorage.getItem("credentials"))

  render() {
    console.log(this.state.activeUser)
    return (
      <React.Fragment>
        <NavBar setAuth={this.props.setAuth} activeUser={this.state.activeUser} />
        <ApplicationViews
          activeUserId={this.activeUserId}
          activeUser={this.state.activeUser}
        />
      </React.Fragment>
    )
  }
}