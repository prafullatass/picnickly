import React from "react"
import Button from "../reusableComponents/Button";
import EditModal from "./EditModal";
import CreateObject from "../../Modules/CreateObject";

const DetailCard = ({ id, name, confirmDel, list, createObjFn, edit}) => {
    return (

        <tr id={id} key={id}>
            <td>{name} </td>
            <td>
                <EditModal value = {name} label="Name "
                createNewObject={edit}
                createObjFn={createObjFn}
                list={list} id ={id} />
            </td>
            <td>
                <Button
                    className="footerButton CommonButton delButton"
                    id={id}
                    onClickFunction={confirmDel}
                    caption="Delete"
                />
            </td>
        </tr>

    )
}

export default DetailCard