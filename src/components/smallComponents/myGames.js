import React, { Component } from "react"
import ModelNewObj from "../picnic/ModelNewObj";
import CreateObject from "../../Modules/CreateObject";
import DetailCard from "./DetailCard";
import { Table } from 'reactstrap';
class MyGames extends Component {

    confirmDel = (evt) => {
        if (window.confirm("Delete this Game?"))
            this.props.deleteMyGame(parseInt(evt.target.id))
    }

    render() {
        return (
            <div className="Container">
                <div className="inlineAll">
                    <label htmlFor="myGames">New Game - </label>
                    <ModelNewObj createNewObject={this.props.createMyGame}
                        buttonLabel=" New Game"
                        label="Name of Game: "
                        createObjFn={CreateObject.MyGamesObj}
                        list={this.props.myGames
                            .filter(game => game.userId === parseInt(sessionStorage.getItem("credentials")))
                            .map(game => game.gameName)}
                    />
                </div>
                <Table hover size="sm" style={{backgroundColor :"white"}}>
                <tbody>
                {this.props.myGames
                    .filter(game => game.userId === parseInt(sessionStorage.getItem("credentials")))
                    .map(myGame =>
                        <DetailCard id={myGame.id}
                            name={myGame.gameName}
                            confirmDel={this.confirmDel} />
                    )}
                    </tbody>
                    </Table>
            </div>
        )
    }
}

export default MyGames