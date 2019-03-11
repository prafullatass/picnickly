import APIManager from "../utilities/APIManager";
import urlLink from "../utilities/UrlLink";

const UserManager = Object.create(APIManager, {
    DBname: {
        value: "users"
    },

    searchUP: {
        value: function (username, password) {
            return fetch(
                `${urlLink.url}/users?username=${username}&password=${password}`
            ).then(e => e.json())
        }
    },

    searchUsername: {
        value: function (username) {
            return fetch(`${urlLink.url}/users?username=${username}`)
                .then(e => e.json()
                )
        }
    }
})

export default UserManager