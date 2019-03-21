import React from "react"
import Button from "../reusableComponents/Button";

const DetailCard = ({ id, name, confirmDel }) => {
    return (

        <tr id={id} key={id}>
            <td>{name} </td>
            <td>
                <Button
                    className="footerButton CommonButton submitButton"
                    onClickFunction={() =>
                        this.props.history.push(`/items/${id}/edit`)}
                    caption="Edit"
                />
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