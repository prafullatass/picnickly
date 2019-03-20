import React, { Component } from "react"
import GetParkData from "../../Modules/GetParkData";
import SelectPark from "../parks/SelectPark";
import Input from "../reusableComponents/Input";
import Button from "../reusableComponents/Button";
import PicnicManager from "../../ResourceManager/PicnicManager";
import GamesManager from "../../ResourceManager/GamesManager";
import ItemsManager from "../../ResourceManager/ItemsManager";
import FoodItemsManager from "../../ResourceManager/FoodItemsManager";
import { Label } from "reactstrap"
import { TabContent, TabPane, Nav, NavItem, NavLink, Spinner, Row, Col, Badge } from 'reactstrap';
import classnames from 'classnames';
//import { InputGroup, InputGroupAddon, InputGroupText, Input as InputReact } from 'reactstrap';

class Pack extends Component {
    state = {
        userId: "",
        parkName: "",
        address: "",
        parkDetails: "",
        picnicDate: "",
        parks: [],
        dropdownOpen: false,
        selectedGames: [],
        selectedItems: [],
        selectedFoodItems: [],
        activeTab: '1'
    };


    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    componentDidMount() {
        console.log("componentDidMount -- EditPicnic")
        let fetchedObj = {}
        sessionStorage.setItem("picnic", this.props.match.params.picnicId)
        const promises = []
        GetParkData().then(parks => {
            fetchedObj.parks = parks
            promises.push(PicnicManager.GET(this.props.match.params.picnicId)
                .then(picnicData => {
                    fetchedObj.parkName = picnicData.parkName
                    fetchedObj.address = picnicData.address
                    fetchedObj.picnicDate = picnicData.picnicDate
                    fetchedObj.userId = picnicData.userId
                    fetchedObj.parkDetails = parks.find(park => park.parkName === picnicData.parkName).features
                }))
            promises.push(this.getDataForArray(GamesManager, "selectedGames", "myGameId"))
            promises.push(this.getDataForArray(ItemsManager, "selectedItems", "itemListId"))
            promises.push(this.getDataForArray(FoodItemsManager, "selectedFoodItems", "foodItemName"))
            Promise.all(promises).then(() => {
                this.setState(fetchedObj)
                console.log(this.state)
            })
        })
    }


    getDataForArray = (objManager, arrayName, idName) => {
        return objManager.GETALLPICNICDATA(parseInt(sessionStorage.getItem("picnic")))
        .then(allData => {
            allData.forEach(data => {
                this.state[arrayName].push({
                    id: data.id,
                    FKid: data[idName],
                    packed: data.packed
                })
            });
        })
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    handleParkNameChange = obj => {
        this.setState(obj)
    }

    handleCheckBoxChangeGames = (event) => {
        let NewArray = this.UpdatePackedStatus(this.state.selectedGames, parseInt(event.target.id))
        this.setState({ selectedGames: NewArray })
    }

    handleCheckBoxChangeItems = (event) => {
        let NewArray = this.UpdatePackedStatus(this.state.selectedItems, parseInt(event.target.id))
        this.setState({ selectedItems: NewArray })
    }
    handleCheckBoxChangeFoodItems = (event) => {
        let NewArray = this.UpdatePackedStatus(this.state.selectedFoodItems, parseInt(event.target.id))
        this.setState({ selectedFoodItems: NewArray })
    }

    UpdatePackedStatus = (arrayName, id) => {
        arrayName.find(obj => obj.id === id ? obj.packed = true : "")
        return arrayName
    }

    DoneForm = (evt) => {
        console.log("update")
        evt.preventDefault();
        let promises = []
        this.state.selectedGames.map(game => (
            promises.push(this.props.patchGames(
                {
                    id: game.id,
                    packed: game.packed
                }
            ))
        ))
        this.state.selectedItems.map(item => (
            promises.push(this.props.patchItems(
                {
                    id: item.id,
                    packed: item.packed
                }
            ))
        ))
        this.state.selectedFoodItems.map(foodItem => (
            promises.push(this.props.patchFoodItems(
                {
                    id: foodItem.id,
                    packed: foodItem.packed
                }
            ))
        ))
        Promise.all(promises).then(() => {
            this.props.setStateOfAll()
            this.props.history.push("/")
        })
    }


    addspinner = (array) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].packed === false)
                return true
        }
        return false
        //<Spinner color="warning" />
    }



    render() {
        console.log("pack", this.state)
        return (
            <React.Fragment>
                <form className="picnicForm">
                    <h3>Let's Pack for Picnic</h3>
                    <SelectPark handleParkNameChange={this.handleParkNameChange}
                        parks={this.state.parks}
                        address={this.state.address}
                        parkDetails={this.state.parkDetails}
                        parkName={this.state.parkName} />

                    <Input id="picnicDate" handleFieldChange={this.handleFieldChange}
                        type="date"
                        label="Picnic Date :"
                        value={this.state.picnicDate}
                        disabled="disabled"  />

                    <h5><Badge color="info" pill>Things To Pack in Your Picnic Basket</Badge></h5>
                    <div className="TabContainer">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >Games {this.addspinner(this.state.selectedGames) ?
                                    <Spinner size="sm" color="warning" /> : "😃"}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Necessity Items {this.addspinner(this.state.selectedItems) ?
                                        <Spinner size="sm" color="warning" /> : "😃"}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggle('3'); }}
                                >
                                    Food Items {this.addspinner(this.state.selectedFoodItems) ?
                                        <Spinner size="sm" color="warning" /> : "😃"}
                                </NavLink>
                            </NavItem>
                        </Nav>

                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">

                                <div className="form-group">
                                    <Row>
                                        <Col> Games to be Packed </Col>
                                        <Col> Packed ?</Col>
                                    </Row>
                                    <hr />
                                    <div>
                                        {this.state.selectedGames.map((game, idx) => (

                                            <div key={game.id}>
                                                <Row>
                                                    <Col>
                                                        <Label for={game.FKid}>
                                                            {this.props.myGames
                                                                .find(obj => obj.id === game.FKid).gameName}
                                                        </Label>
                                                    </Col>
                                                    <Col>
                                                        <input type="checkbox"
                                                            name={game.FKid}
                                                            id={game.id}
                                                            checked={this.state.selectedGames[idx].packed}
                                                            onChange={this.handleCheckBoxChangeGames} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                        )}
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="2">

                                <div className="form-group">
                                    <Row>
                                        <Col> Necessity Items to be Packed </Col>
                                        <Col> Packed ?</Col>
                                    </Row>
                                    <hr />
                                    {this.state.selectedItems.map((item, idx) => (
                                        <div key={item.FKid}>
                                            <Row>
                                                <Col>
                                                    <Label for={item.FKid}>
                                                        {this.props.itemList.find(obj => obj.id === item.FKid).itemName}
                                                    </Label>
                                                </Col>
                                                <Col>
                                                    <input type="checkbox"
                                                        name={item.FKid}
                                                        id={item.id}
                                                        checked={this.state.selectedItems[idx].packed}
                                                        onChange={this.handleCheckBoxChangeItems} />
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                </div>

                            </TabPane>
                            <TabPane tabId="3">
                                <div className="form-group">
                                    <Row>
                                        <Col> Food to go--- </Col>
                                        <Col> Packed ?</Col>
                                    </Row>
                                    <hr/>
                                    {this.state.selectedFoodItems
                                    .sort((a,b)=>(a.FKid < b.FKid) ? -1: 1)
                                    .map((food, idx) => (
                                        <div key={idx}>
                                            <Row>
                                                <Col>
                                                    <Label for={food.FKid}>
                                                        {food.FKid}
                                                    </Label>
                                                </Col>
                                                <Col>
                                                    <input type="checkbox"
                                                        name={food.FKid}
                                                        id={food.id}
                                                        checked={this.state.selectedFoodItems[idx].foodItem}
                                                        onChange={this.handleCheckBoxChangeFoodItems} />
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                </div>
                            </TabPane>
                        </TabContent>
                    </div>
                    <div className="btnContainer">
                        <Button caption="Update" className="submitButton CommonButton"
                            onClickFunction={this.DoneForm} />
                        <Button caption="Cancel" className = "cancelButton CommonButton"
                            onClickFunction={() => this.props.history.push("/")} />
                    </div>
                </form>
            </React.Fragment >
        )
    }
}
export default Pack