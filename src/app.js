const path = require('path')
const express = require('express')
const hbs = require('hbs')  //hbs is handlerbars
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')


//Define path for Express config
console.log(__dirname)
console.log(path.join(__dirname, '../public'))
console.log(__filename)
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


const app = express() //express is a web server function 
const publicDirectoryPath = path.join(__dirname, '../public')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')  //set handlebars for express
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup statci direcotry to serve
app.use(express.static(publicDirectoryPath))  //static contents in public folder

//Setup dynamic conents via handlebars
app.get('', (req, res) => {    //generate dynamic contents via handlebars
    res.render('index', {
        title: 'Weather',
        name: 'Tom  Qian'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Tom Qian'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Please open a case',
        name: 'Tom Qian'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must produce an address!'
        })
    }

    else {
        geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {  //geocode(address, (error, response) 
            if (error) {
                return res.send({error})
            }
            forecast(latitude, longtitude, (error, forecastData) => {   //forecast(response.latitude, response.longtitude, (error, forecastData)
                if (error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    'query address': req.query.address
                })
            })
        })
    }
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: [
        ]
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tom Qian',
        notFound: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tom Qian',
        notFound: 'Page not found.'
    })
})


//Start the webserver
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
