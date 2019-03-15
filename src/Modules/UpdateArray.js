
const UpdateArray = Object.create(null, {

    CheckArray: {
        value: function (id, arrayName) {
            return arrayName.includes(id) ? true : false
        }
    },

    Update: {
        value: function (id, NewArray) {
            if (this.CheckArray(parseInt(id), NewArray)) {
                const idx = NewArray.findIndex(el => el === parseInt(id))
                if (idx !== -1) {
                    NewArray.splice(idx, 1)
                }
            }
            else {
                NewArray.push(parseInt(id))
            }
            console.log(NewArray)
            return NewArray
        }
    }

})

export default UpdateArray