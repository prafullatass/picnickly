

const UsefulFn = Object.create(null, {
    CapitalizeFirstLetter: {
        value: function (string) {
            string = string.toLowerCase()
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
})

export default UsefulFn