import React, { Component } from "react"


const getweather = () => {
    return fetch(`api.openweathermap.org/data/2.5/forecast?zip=37067,us&appid=${apiKey}`)
        .then(r => r.json())
        .then(data => {
            debugger
            console.log(data)
        })

}
const apiKey = "6366b782dabe1c695249056623afcb2a"

class checkweather extends Component {
    render (){
        return(
            <div>{getweather()} hi</div>

        )

    }

}

export default checkweather


