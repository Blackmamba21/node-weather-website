const request = require('request')
const geocode = (city, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + city + '.json?access_token=pk.eyJ1IjoiaGFycnkyMSIsImEiOiJjazlpZjN5dXkwMTVyM21vMmlhZmFiZHoxIn0.L6RMkWjzGrbS60nJNY_3DQ.org&limit=1'
    console.log("url@@@@@@@@", url)
    request({ /* url: url */ url, json: true }, (error, /* response */ { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (/* response.body.features.length === 0 */ body.features.length === 0) {
            callback("Unable to find location! Try another search", undefined)
        } else {
            callback(undefined, {
                // latitude: response.body.features[0].center[0],
                // longitude: response.body.features[0].center[1],
                // location: response.body.features[0].place_name,
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name,
            })
        }

    })

}

module.exports = geocode