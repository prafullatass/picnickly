import React, { Component } from "react"
import ModelNewObj from "../picnic/ModelNewObj";
import CreateObject from "../../Modules/CreateObject";
import DetailCard from "./DetailCard";
import { Table } from 'reactstrap';

import "../picnic/picnic.css"
class Items extends Component {

    confirmDel = (evt) => {
        if (window.confirm("Delete this item?"))
            this.props.deleteItemList(parseInt(evt.target.id))
    }

    render() {
        return (
            <React.Fragment>
                <div className="Container">
                    <div className="inlineAll center">
                        <label htmlFor="items">New necessary items -</label>
                        <ModelNewObj createNewObject={this.props.createItemsList}
                            buttonLabel=" New Item"
                            label="Name of Item : "
                            createObjFn={CreateObject.ItemListObj}
                            list={this.props.itemList.map(item => item.itemName)}
                        />
                    </div>
                    <Table hover size="sm" style={{backgroundColor :"white"}}>
                <tbody>
                    {this.props.itemList
                        .map(item =>
                            <DetailCard id={item.id} key={item.id}
                                name={item.itemName}
                                confirmDel={this.confirmDel}
                                createObjFn={CreateObject.ItemListObj}
                                list ={this.props.itemList
                                    .filter(item => item.userId === parseInt(sessionStorage.getItem("credentials")))
                                    .map(item => item.itemName)}
                                    edit = {this.props.editItemsList} />
                        )}
                        </tbody>
                        </Table>
                </div>
            </React.Fragment>
        )
    }
}

export default Items