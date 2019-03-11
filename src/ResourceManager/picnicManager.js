import APIManager from "../utilities/APIManager";

const PicnicManager = Object.create(APIManager, {
    DBname: {
        value: "picnic"
    }
})

export default PicnicManager