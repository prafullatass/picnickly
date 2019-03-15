import ParkData from "../ResourceManager/ParkDataManager";


const getfeatures = (obj) => {
    return Object.keys(obj).filter(key => obj[key] === "Yes")
      .map(key => key.replace("_", " "));
  }

export default () => {
    return ParkData.GETALL()
        .then(parkdata => {
            const parks = parkdata.filter(park => park.picnic_shelters === "Yes")
                .sort((a, b) => a.park_name > b.park_name ? 1 : -1)
                .map((park, index) => {
                    return {
                        id: index,
                        parkName: park.park_name,
                        address: park.mapped_location_address,
                        address2: park.mapped_location_city + " " + park.mapped_location_state,
                        features: getfeatures(park)
                    }
                })
            return parks
        })
    }

