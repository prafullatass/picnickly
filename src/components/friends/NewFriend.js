import React, { Component } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Input from "../reusableComponents/Input";
import UsefulFn from "../../Modules/UsalfulFn";
import Validation from "../../Modules/Validation";
import ImageUploader from 'react-images-upload';
import CreateObject from "../../Modules/CreateObject";
import Button from "../reusableComponents/Button";


class ModelNewFriend extends Component {


    state = {
        modal: false,
        name: "",
        pic: [],
        friendId: ""
    };

    toggle = (e) => {
        e.preventDefault()
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    upload = (evt, value) => {
        this.setState({ pic: value })
    }

    handleFieldChange = (evt) => {
        this.setState({ name: evt.target.value })
    }

    handleUsersChange = evt => {
        //console.log(evt.target.selectedOptions[0].text.split(" ")[0])

        this.setState({
            friendId: evt.target.value,
            name: evt.target.selectedOptions[0].text.split(" ")[0]
        })
    }

    addFriend = (evt) => {
        const _this = this
        console.log(_this.state)
        const capitalLetterItem = UsefulFn.CapitalizeFirstLetter(_this.state.name)
        const list = _this.props.friendsList
            .filter(friend => friend.id === parseInt(sessionStorage.getItem("credentials")))
            .map(friend => friend.nickName)
        if (Validation.Duplicate(capitalLetterItem, list) === false) {
            _this.props.createFriends(
                CreateObject.friendsObj(
                    parseInt(sessionStorage.getItem("credentials")),
                    parseInt(_this.state.friendId),
                    capitalLetterItem,
                    _this.state.pic
                )
            )

            _this.toggle(evt)
        }
        _this.setState({
            name: ""
        })
    }


    render() {
        const _this = this
        let frndList = this.props.friendsList
            .filter(friend => friend.userId === parseInt(sessionStorage.getItem("credentials")))
            .map(friend => friend.myFriendId)

        return (
            <div>
                <Button caption="New Friend" className="newButton CommonButton"
                    onClickFunction={this.toggle} />
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{this.props.label}</ModalHeader>
                    <ModalBody>
                        <label htmlFor="users">List</label>
                        <select
                            name="users"
                            id="users"
                            onChange={this.handleUsersChange} >
                            <option value="">Select Friends</option>
                            {this.props.users.filter(user => !frndList.includes(user.id))
                                .filter(user => user.id !== parseInt(sessionStorage.getItem("credentials")))
                                .map(e => (
                                    <option key={e.id} id={e.id} value={e.id}>
                                        {e.firstName} {e.lastName}
                                    </option>
                                ))}
                        </select>
                        <Input id="new" handleFieldChange={_this.handleFieldChange}
                            type="text"
                            label="Nick Name"
                            autofocus={true}
                            ref="modelInput"
                            value={this.state.name}
                        />
                        <ImageUploader style={{ maxWidth: '500px', margin: "20px auto" }}
                            withPreview={true}
                            withIcon={true}
                            optimisticPreviews
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                            onChange={this.upload} />
                    </ModalBody>
                    <ModalFooter>
                        <Button caption="Add" className="submitButton CommonButton"
                            onClickFunction={this.addFriend}> </Button>
                        <Button caption="Cancel" className="cancelButton CommonButton"
                            onClickFunction={this.toggle}></Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}


export default ModelNewFriend