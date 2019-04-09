import APIManager from "../utilities/APIManager";

const GamesManagers = Object.create(APIManager, {
    DBname: {
        value: "games"
    }
})

export default GamesManagers