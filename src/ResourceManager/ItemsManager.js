import APIManager from "../utilities/APIManager";

const ItemsManager = Object.create(APIManager, {
    DBname: {
        value: "items"
    }
})

export default ItemsManager