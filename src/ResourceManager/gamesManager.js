import APIManager from "../utilities/APIManager";

const GamesManager = Object.create(APIManager, {
    DBname: {
        value: "games"
    }
})

export default GamesManager