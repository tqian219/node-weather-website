const request = require('request')
const chalk = require('chalk')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidGNxIiwiYSI6ImNrajk0aTB1MTJhNjQyc3NienhpbG1neGoifQ.dvPiSwN7MGRr93seVDqrqQ&limit=1'

    request ({url, json: true}, (error, {body}) => {                            //request ({url: url, json: true}, error response)
        if (error) {
            callback('Unable to connect to locaiton services!', undefined)
        } else if (body.features.length === 0) {                                //else if (response.body.features.length === 0) {}
            callback('Unable to find locaiton, Try another search.', undefined)
        } else {
            callback (undefined, {
                latitude: body.features[0].center[1],               //response.latitude:
                longtitude: body.features[0].center[0],             //response.longtitde:
                location: body.features[0].place_name               //response.location
            })
        }
    })
}

module.exports = geocode