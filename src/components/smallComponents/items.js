import React, { Component } from "react"
import ModelNewObj from "../picnic/ModelNewObj";
import CreateObject from "../../Modules/CreateObject";
import DetailCard from "./DetailCard";
class Items extends Component {

    confirmDel = (evt) => {
        if (window.confirm("Delete this item?"))
            this.props.deleteItemList(parseInt(evt.target.id))
    }

    render() {
        return (
            <div className="Container">
                <div className="inlineAll">
                    <label htmlFor="items">New necessary items -</label>
                    <ModelNewObj createNewObject={this.props.createItemsList}
                        buttonLabel=" New Item"
                        label="Name of Item : "
                        createObjFn={CreateObject.ItemListObj}
                        list={this.props.itemList.map(item => item.itemName)}
                    />
                </div>
                {this.props.itemList
                    .map(item =>
                        <DetailCard id={item.id}
                        name={item.itemName}
                        confirmDel={this.confirmDel} />
                    )}
            </div>
        )
    }
}

export default Items