import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Nav, NavItem, NavLink, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Navbar } from 'reactstrap';
import "./Nav.css"
import logo from '../../picnic.jpg';
import PicnicFriendsManager from "../../ResourceManager/PicnicFriendsManager";
import { Spinner } from 'reactstrap';

let inv = false
class NavBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }
componentDidMount () {
    PicnicFriendsManager.GETALL()
    .then(invitataions =>{
      const anyinv = invitataions.find(inv => inv.friendId === parseInt(sessionStorage.getItem("credentials"))
      && inv.confirmed === false)
      if (anyinv !== undefined)
        inv = true
    }
    )
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
                <Nav className="titleBar ml-auto" >
                    <NavItem className="title" >
                        <img src={logo} alt="" height="42" width="42"></img>
                        Picknickly
                    </NavItem>
                    <NavItem className="ml-auto userName">

                        <NavLink>Welcome  {this.props.activeUser.firstName} </NavLink>
                    </NavItem>
                    <NavItem className="ml-auto">
                        <button
                            type="button"
                            className="CommonButton cancelButton logout"
                            onClick={this.logout}>
                            Logout
                    </button>
                    </NavItem>
                </Nav>
                <Navbar color="faded height" light expand="md" style={{ backgroundColor: "lightgreen" }}>
                    <Nav color="light flexContainer" >
                        <NavItem>
                            <NavLink tag={Link} to="/">Picnics
                            </NavLink>
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
                                <DropdownItem tag={Link} to="/mygames">Games</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem tag={Link} to="/items"  >Necessity Items</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem tag={Link} to="/friends/New">Friends</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <NavItem>
                            <NavLink tag={Link} to="/invitations">Invitations
                                {inv ? <Spinner type="grow" color="light" /> : ""}
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default NavBar
