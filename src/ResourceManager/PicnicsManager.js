import APIManager from "../utilities/APIManager";

const PicnicsManager = Object.create(APIManager, {
    DBname: {
        value: "picnic"
    }
})

export default PicnicsManager