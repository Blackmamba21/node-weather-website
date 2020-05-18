const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

console.log(__filename)
console.log(path.join(__dirname, '../public'))

// define paths for express config
const publicPathToDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPathToDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Created by Harish'
    })

});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        name: 'The champ is here'
    })

});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is help page',
        name: 'John Cena'

    })

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harish',
        errorMessages: 'Help Articles Not Found'
    })
});

app.get('/products', (req, res) => {
    console.log("@@@@@@@@@", req.query)
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    });

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    } else {
        geocode(req.query.address, (error, /*data*/ { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(/*data.latitude, data.longitude*/ latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                });


            })
        })
    }


})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harish',
        errorMessages: 'Page Not Found'
    })
});


// app.get('', (req, res) => {
//     res.send('Hello express!');

// })
// app.get('/help', (req, res) => {
//     res.send([{
//         name: "harish",
//         age: 23
//     }, {
//         name: "vishal",
//         age: 25
//     }, {
//         name: "sid",
//         age: 28
//     }]);

// })
// app.get('/about', (req, res) => {
//     res.send('<h1>This is about page!</h1>');

// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: '20 degree celsius',
//         location: 'Kota, Rajasthan, India'
//     });

// })



app.listen(port, () => {
    console.log("server is up on port " + port)
})