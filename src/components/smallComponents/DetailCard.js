import React from "react"
import { Card, CardTitle } from "reactstrap"
import Button from "../reusableComponents/Button";

const DetailCard = ({ id, name, confirmDel }) => {
    return (
        <div>
            <Card body className="cardSize"
                id={id} key={id}>
                <CardTitle>{name}
                    <Button
                        className="footerButton CommonButton submitButton"
                        onClickFunction={() =>
                            this.props.history.push(`/items/${id}/edit`)}
                        caption="Edit"
                    />
                    <Button
                        className="footerButton CommonButton delButton"
                        id={id}
                        onClickFunction={confirmDel}
                        caption="Delete"
                    />
                </CardTitle>
            </Card>
        </div>
    )
}

export default DetailCard