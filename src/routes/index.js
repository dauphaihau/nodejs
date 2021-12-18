const newsRouter = require('./news')
const siteRouter = require('./site')
const coursesRouter = require('./courses')
const meRouter = require('./me')

function route(app) {

    app.use('/news', newsRouter)
    app.use('/courses', coursesRouter)
    app.use('/me', meRouter)
    app.use('/', siteRouter)

    // app.get('/news', (req, res) => {
    //     return res.render('News')
    // })
    //
    // app.get('/', (req, res) => res.render('Home'))
    //
    // app.get('/search', (req, res) => {
    //     console.log(req.query.q)
    //     res.render('search')
    // })
    //
    // app.post('/search', (req, res) => {
    //     res.send('')
    // })

// app.get('/news', (req, res) => {
//     return res.send('Hello World!')
// })
}

module.exports = route;