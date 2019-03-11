const ParkData = Object.create(null,
    {
        GETALL: {
            value: function () {
                return fetch("https://data.nashville.gov/resource/xbru-cfzi.json")
                .then(res => res.json())
            }
        }
    }
)

export default ParkData
