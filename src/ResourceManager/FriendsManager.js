import APIManager from "../utilities/APIManager";

const FriendsManager = Object.create(APIManager, {
    DBname: {
        value: "friends"
    }
})

export default FriendsManager