import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Nav, NavItem, NavLink,Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import "./Nav.css"
class NavBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
        dropdownOpen: false
      };
    }


    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }

    logout = () => {
        sessionStorage.clear("credentials")
        this.props.setAuth()
    }

    render() {
        return (
            <div id="app" className="container">
                <Nav className="titleBar">
                    <NavItem>
                        <NavLink className="title" >Picknickly</NavLink>
                    </NavItem>
                    <a id="name" className="nav-link">Welcome  {this.props.activeUser.firstName}
                        {' '} {this.props.activeUser.lastName} </a>
                    <button
                        type="button"
                        className="CommonButton cancelButton logout"
                        onClick={this.logout}>
                        Logout
                    </button>
                </Nav>
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
                    <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle nav caret>
                            Manage
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem >Games</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem >Necessity Items</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem tag={Link} to="/friends/New">Friends</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Nav>
            </div>
        )
    }
}

export default NavBar
