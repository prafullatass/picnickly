
const UpdateArray = Object.create(null, {

    CheckArray: {
        value: function (id, arrayName) {
            return arrayName.includes(id) ? true : false
        }
    },

    Update: {
        value: function (id, NewArray, string) {

            if(string !=="yes")
                id = parseInt(id)
            if (this.CheckArray(id, NewArray)) {
                const idx = NewArray.findIndex(el => el === id)
                if (idx !== -1) {
                    NewArray.splice(idx, 1)
                }
            }
            else {
                NewArray.push(id)
            }
            console.log(NewArray)
            return NewArray
        }
    }

})

export default UpdateArray