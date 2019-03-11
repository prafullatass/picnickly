import APIManager from "../utilities/APIManager";

const MyGamesManger = Object.create(APIManager, {
    DBname: {
        value: "myGames"
    }
})

export default MyGamesManger