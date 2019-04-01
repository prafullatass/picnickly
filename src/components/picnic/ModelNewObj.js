import React, { Component } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Input from "../reusableComponents/Input";
import UsefulFn from "../../Modules/UsalfulFn";
import Validation from "../../Modules/Validation";
import Button from "../reusableComponents/Button";

class ModelNewObj extends Component {
    state = {
        modal: false,
        new: ""
    };

    toggle = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    handleFieldChange = (evt) => {
        const _this = this
        _this.setState({
            newGame: evt.target.value
        })
    }

    newGame = (e) => {
        e.preventDefault();
        const _this = this
        const capitalLetterItem = UsefulFn.CapitalizeFirstLetter(_this.state.newGame)
        if (Validation.Duplicate(capitalLetterItem, _this.props.list) === false) {
            _this.props.createNewObject(
                _this.props.createObjFn(
                    capitalLetterItem,
                    parseInt(sessionStorage.getItem("credentials"))
                )
            )
            _this.toggle(e)
        }
        _this.setState({
            newGame: ""
        })
    }


    render() {
        const _this = this
        return (
            <div>
                <Button caption={_this.props.buttonLabel} className="newButton CommonButton"
                    onClickFunction={this.toggle} />
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{this.props.label}</ModalHeader>
                    <ModalBody>
                        <Input id="new" handleFieldChange={_this.handleFieldChange}
                            type="text"
                            label={_this.props.label}
                            autofocus={true}
                            ref="modelInput"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button caption="Add" className="submitButton CommonButton"
                         onClickFunction={this.newGame} />
                        <Button caption="Cancel" className="cancelButton CommonButton"
                         onClickFunction={this.toggle} />
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}


export default ModelNewObj