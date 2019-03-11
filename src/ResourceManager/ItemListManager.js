import APIManager from "../utilities/APIManager";

const ItemsListManager = Object.create(APIManager, {
    DBname: {
        value: "itemsList"
    }
})

export default ItemsListManager