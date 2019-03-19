import React, { Component } from "react"
import UserAccessLayer from "../UserAccessLayer"
import LoginOrRegister from "./LoginOrRegister";

class IsAuth extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.isAuthenticated() ? (
          <UserAccessLayer {...this.props} />
        ) : (
          <LoginOrRegister {...this.props} />
        )}
      </React.Fragment>
    )
  }
}

export default IsAuth