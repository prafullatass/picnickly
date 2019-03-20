import React, { Component } from "react"
import ModelNewObj from "../picnic/ModelNewObj";
import CreateObject from "../../Modules/CreateObject";
import DetailCard from "./DetailCard";
class MyGames extends Component {

    confirmDel = (evt) => {
        if (window.confirm("Delete this Game?"))
            this.props.deleteMyGamesList(parseInt(evt.target.id))
    }

    render() {
        return (
            <div className="Container">
                <div className="inlineAll">
                    <label htmlFor="myGames">New Game - </label>
                    <ModelNewObj createNewObject={this.props.createMyGames}
                        buttonLabel=" New Game"
                        label="Name of Game: "
                        createObjFn={CreateObject.MyGamesObj}
                        list={this.props.myGames
                            .filter(game => game.userId === parseInt(sessionStorage.getItem("credentials")))
                            .map(game => game.gameName)}
                    />
                </div>
                {this.props.myGames
                    .filter(game => game.userId === parseInt(sessionStorage.getItem("credentials")))
                    .map(myGame =>
                        <DetailCard id={myGame.id}
                            name={myGame.gameName}
                            confirmDel={this.confirmDel} />
                    )}
            </div>
        )
    }
}

export default MyGames