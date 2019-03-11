import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Nav, NavItem, NavLink } from 'reactstrap';

class NavBar extends Component {
    logout = () => {
        sessionStorage.clear("credentials")
        this.props.setAuth()
      }

    render() {
        return (

        <Nav>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
                <a className="nav-link">Aloha {this.props.activeUser.username}</a>
                <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={this.logout}>
                    Logout
                    </button>
            </Nav>
        )
    }
}

export default NavBar
