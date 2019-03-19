import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Nav, NavItem, NavLink } from 'reactstrap';
import "./Nav.css"
class NavBar extends Component {
    logout = () => {
        sessionStorage.clear("credentials")
        this.props.setAuth()
    }

    render() {
        return (
            <div id="app" className="container">
                <Nav color="light flexContainer" >
                    <NavItem>
                        <NavLink tag={Link} to="/">Picnics</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/new">New</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/past">History</NavLink>
                    </NavItem>
                    <a id= "name" className="nav-link">Welcome  {this.props.activeUser.username}</a>
                    <button
                        type="button"
                        className="btn btn-outline-info logout"
                        onClick={this.logout}>
                        Logout
                    </button>
                </Nav>
            </div>
        )
    }
}

export default NavBar
