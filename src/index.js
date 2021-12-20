const express = require('express')
const path = require('path') // lib built-in of nodejs
const morgan = require('morgan');
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const route = require('./routes')
const db = require('./config/db')

const sortMiddleware = require('./app/middlewares/sortMiddleware')

// connect to DB
db.connect();

const app = express() // fn express was declare
const port = 3000

// Static files ( on browser : http://localhost:3000/img/octocat.png , localhost:3000 is public )
app.use(express.static(path.join(__dirname, 'public')))

// middleware process From data when we submit
app.use(express.urlencoded({extended: true})) // setup middleware
app.use(express.json()) // post code Js to server

// custom middleware
app.use(sortMiddleware)

// HTTP logger
// app.use(morgan('combined'));

app.use(methodOverride('_method'))

// Template engine
app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: require('./helpers/handlebars')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

console.log(__dirname) // logs: info file index.js
console.log('PATH: ', path.join(__dirname, 'resource', 'views'))

// Home, search, contact

// Routes init
route(app)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
