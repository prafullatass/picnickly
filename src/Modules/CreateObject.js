
const CreateObject = Object.create(null,
    {
        PicnicObj: {
            value: function (user_id, name, address, dt) {
                return {
                    userId: user_id,
                    parkName: name,
                    address: address,
                    picnicDate: dt
                }
            }
        },
        GamesObj: {
            value: function (picId, gameId, packed) {
                return {
                    picnicId: picId,
                    gameId: gameId,
                    packed: packed
                }
            }
        },
        MyGamesObj: {
            value: function (name, user_id) {
                return {
                    gameName: name,
                    userId: user_id
                }
            }
        },
        ItemsObj: {
            value: function (picId, itemId, packed) {
                return {
                    picnicId: picId,
                    itemId: itemId,
                    packed: packed
                }
            }
        },
        ItemListObj: {
            value: function (name, user_id) {
                return {
                    itemName: name
                }
            }
        },
        FoodItemsObj: {
            value: function (picId, foodItemName, packed) {
                return {
                    picnicId: picId,
                    foodItemName: foodItemName,
                    packed: packed
                }
            }
        }
    }
)


export default CreateObject