const request = require('request')
const chalk = require('chalk')

const forecast = (latitude, longtitude, callback) => { 
    const url = 'http://api.weatherstack.com/current?access_key=f9f706c68fe678dbcea3b236b93a710a&query=' + latitude + ',' + longtitude + '&units=f'
    // console.log(latitude, longtitude)
    // console.log(url)
    request ({url, json: true}, (error, { body }) => {  //(error, response)
        if (error) {
            callback('Unable to connect to locaiton services!', undefined)
        } else if (body.error) {
            callback('Unable to find locaiton, Try another search.', undefined)
        } else {
            callback (undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degrees.' + 'The humidy is ' + body.current.humidity + '.')
        }
    })
}

module.exports = forecast


//const url = 'http://api.weatherstack.com/current?access_key=f9f706c68fe678dbcea3b236b93a710a&query=37.8267,-122.4233&units=f'
// request({url: url, json: true}, (error, response) => {
//     // console.log(error)
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } 
//     else if (response.body.error) {
//         console.log('Unable to find location')
//     }
//     else {
//     console.log(chalk.yellow(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degress out. It feels like ' + response.body.current.feelslike + ' degrees.'))
// }})