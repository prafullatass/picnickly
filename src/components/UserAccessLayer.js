import React, { Component } from "react"
//import Nav from "./nav/Nav"
import ApplicationViews from "./ApplicationViews"
import UserManager from "../ResourceManager/userManager";
import NavBar from "./nav/Nav";
import PicnicFriendsManager from "../ResourceManager/PicnicFriendsManager";

export default class UserAccessLayer extends Component {
  state = {
    activeUser: {},
    inv: false
  }

  CheckSpinner = () => {
    PicnicFriendsManager.GETALL()
      .then(invitataions => {
        const anyinv = invitataions.find(inv => inv.friendId === parseInt(sessionStorage.getItem("credentials"))
          && inv.confirmed === false)
        if (anyinv !== undefined)
          this.setState({ inv: true })
        else
        this.setState({ inv: false })
      }
      )
  }

  componentDidMount() {
    UserManager.GET(this.activeUserId())
      .then(activeUser => {
        this.setState({ activeUser: activeUser })
        this.CheckSpinner()
      }
      )
  }

  activeUserId = () => parseInt(sessionStorage.getItem("credentials"))

  render() {
    return (
      <React.Fragment>
        <NavBar setAuth={this.props.setAuth} activeUser={this.state.activeUser}
        inv={this.state.inv} />
        <ApplicationViews
          activeUserId={this.activeUserId}
          activeUser={this.state.activeUser}
          CheckSpinner={this.CheckSpinner}
        />
      </React.Fragment>
    )
  }
}