import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Input from "../reusableComponents/Input";
import CreateObject from "../../Modules/CreateObject";

class ModelNewGame extends Component {

    state = {
        modal: false,
        newGame : ""
    };

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    handleFieldChange = (evt) => {
        const _this = this
        
        _this.setState({
            newGame : evt.target.value
        })
    }

    newGame = (event) => {

        const _this = this
        const t = event.target.value
        this.props.createMyGame(CreateObject.MyGamesObj(_this.state.newGame,
        parseInt(sessionStorage.getItem("credentials"))))
    }
    render() {
        return (
            <div>
                <Button color="info" onClick={this.toggle}>Add New Game</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>New Game</ModalHeader>
                    <ModalBody>
                            <Input id="newGame" handleFieldChange={this.handleFieldChange}
                            type="text"
                            label="New Game "
                            />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.newGame}>Add Game!</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}


export default ModelNewGame