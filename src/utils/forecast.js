const request = require('request')
const forecast = (lat, long, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=836e3771ffd530866cc762ac1e143fa1'
    console.log("url", url)
    request({ /* url: url, */ url, json: true }, (error,/*  response */  { body }) => {
        console.log("response", body.main)
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (/* response.body.error */ body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, 'It is currently ' +/*  response.body.main.temp */ body.main.temp + ' kelvin out there'
            )
        }

    })

}

module.exports = forecast