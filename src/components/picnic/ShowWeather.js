import React, { Component } from "react"

import rain from "../../icons/rain.png"
import sun from "../../icons/sun.png"
import Pcloudy from "../../icons/partly-cloudy.png"
import stormy from "../../icons/stormy.png"


import "./weather.css";

let icon = sun
class ShowWeather extends Component {

    geticon = () => {

        switch (this.props.weatherObj.main) {
            case "Clouds":
                icon = Pcloudy
                break;
            case "Rain":
                icon = rain
                break;
            case "Stormy":
                icon = stormy
                break;
            case "Clear":
                icon = sun
                break;
            default:
                break;
        }
    }
    render() {
        this.geticon()
        return (
            <div className="card weather_card bg-warning">
                <div className="title">{this.props.weatherObj.main}</div>
                <hr/>
                <div className="flexbox">
                        <img className="weather-img" src={icon} alt="icons" />
                        <div className="details" >
                            <span className="temp">{this.props.weatherObj.temp}</span> °F
                        <div>Humidity : {this.props.weatherObj.humidity} % </div>
                        <div>Wind : {this.props.weatherObj.wind} mph </div>
                        </div>
                   </div>

            </div>

        )

    }

}

export default ShowWeather


