import React, { Component } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Input from "../reusableComponents/Input";
import UsefulFn from "../../Modules/UsalfulFn";
import Validation from "../../Modules/Validation";
import Button from "../reusableComponents/Button";


class EditModal extends Component { 
    state = {
        modal: false,
        new: this.props.value
    };

    toggle = () => {
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

    newGame = (evt) => {

        const _this = this
        const capitalLetterItem = UsefulFn.CapitalizeFirstLetter(_this.state.newGame)
        let obj = _this.props.createObjFn(
            capitalLetterItem,
            parseInt(sessionStorage.getItem("credentials"))
        )
        obj.id = this.props.id
        if (Validation.Duplicate(capitalLetterItem, _this.props.list) === false) {
            _this.props.createNewObject(obj)
            _this.toggle()
        }
        _this.setState({
            newGame: ""
        })
    }


    render() {
        const _this = this
        return (
            <div>
                <Button caption="Edit" className="submitButton CommonButton"
                    onClickFunction={this.toggle} />
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Make Changes</ModalHeader>
                    <ModalBody>
                        <Input id="new" handleFieldChange={_this.handleFieldChange}
                            type="text"
                            label={_this.props.label}
                            autofocus={true}
                            defaultValue={this.props.value}
                            ref="modelInput"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button caption="Update" className="submitButton CommonButton"
                            onClickFunction={this.newGame} />
                        <Button caption="Cancel" className="cancelButton CommonButton"
                            onClickFunction={this.toggle} />
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default EditModal