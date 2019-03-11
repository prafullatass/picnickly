import APIManager from "../utilities/APIManager";

const FoodItemsManager = Object.create(APIManager, {
    DBname: {
        value: "foodItems"
    }
})

export default FoodItemsManager