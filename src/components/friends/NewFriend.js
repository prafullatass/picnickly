import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Input from "../reusableComponents/Input";
import UsefulFn from "../../Modules/UsalfulFn";
import Validation from "../../Modules/Validation";
import ImageUploader from 'react-images-upload';
import CreateObject from "../../Modules/CreateObject";


class ModelNewFriend extends Component {


    state = {
        modal: false,
        name: "",
        pic: [],
        friendId: ""
    };

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    upload = (evt, value, src) => {

        this.setState({ pic: value })
    }

    handleFieldChange = (evt) => {
        this.state.name = evt.target.value
    }

    handleUsersChange = evt => {
        this.state.friendId = evt.target.value
    }

    addFriend = (evt) => {
        debugger
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

            _this.toggle()
        }
        _this.setState({
            name: ""
        })
    }


    render() {
        const _this = this
        const frndList = this.props.friendsList
            .filter(friend => friend.userId === parseInt(sessionStorage.getItem("credentials")))
            .map(friend => friend.myFriendId)
        return (
            <div>
                <Button color="primary" size="sm" onClick={this.toggle}>New Friend</Button>
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
                        <Button color="primary" onClick={this.addFriend}>Add </Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}


export default ModelNewFriend