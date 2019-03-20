
import APIManager from "../utilities/APIManager";

const PicnicFriendsManager = Object.create(APIManager, {
    DBname: {
        value: "picnicFriends"
    }
})

export default PicnicFriendsManager