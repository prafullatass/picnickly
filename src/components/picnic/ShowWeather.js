import React, { Component } from "react"
import {
    Card, CardImg, CardTitle, CardText, CardBody
} from 'reactstrap';
import rain from "../../icons/rain.png"
import sun from "../../icons/sun.png"
import Pcloudy from "../../icons/partly-cloudy.png"
import stormy from "../../icons/stormy.png"


import "./weather.css";

class ShowWeather extends Component {
    state = {
        icon: sun
    }

    geticon = () => {

        switch (this.props.weatherObj.main) {
            case "Clouds":
                this.state.icon = Pcloudy
                break;
            case "Rain":
                this.state.icon = rain
                break;
            case "Stormy":
                this.state.icon = stormy
                break;
            case "Clear":
                this.state.icon = sun
                break;
            default:
                break;
        }
    }
    render() {
        this.geticon()
        return (
            <div className="card weather_card bg-warning">
                <CardTitle className="title">{this.props.weatherObj.main}</CardTitle>
                <hr/>
                <div className="flexbox">
                        <CardImg className="weather-img" src={this.state.icon} alt="icons" />
                        <CardText className="details" >
                            <span className="temp">{this.props.weatherObj.temp}</span> °F
                        <CardText>Humidity : {this.props.weatherObj.humidity} % </CardText>
                        <CardText>Wind : {this.props.weatherObj.wind} mph </CardText>
                        </CardText>
                   </div>

            </div>

        )

    }

}

export default ShowWeather


