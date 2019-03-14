import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Input from "../reusableComponents/Input";

class ModelNewObj extends Component {

    state = {
        modal: false,
        new : ""
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
        // this.props.createMyGame(CreateObject.MyGamesObj(_this.state.newGame,
        // parseInt(sessionStorage.getItem("credentials"))))
        _this.props.createNewObject(_this.props.createObjFn(_this.state.newGame,
             parseInt(sessionStorage.getItem("credentials"))))
        _this.toggle()
    }
    render() {
        const _this = this
        return (
            <div>
                <Button color="info" onClick={this.toggle}>{_this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{this.props.label}</ModalHeader>
                    <ModalBody>
                            <Input id="new" handleFieldChange={_this.handleFieldChange}
                            type="text"
                            label={_this.props.label}
                            />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.newGame}>Add </Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}


export default ModelNewObj