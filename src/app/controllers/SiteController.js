const Course = require('../models/Course')
const {multipleMongooseToObject} = require('../../util/mongoose')

class SiteController {

    // [GET] /
    index(req, res, next) {
        // Course.find({}, function (err, courses) {
        //     if (!err) {
        //         res.json(courses)
        //     } else {
        //         res.status(400).json({err: 'ERROR!!'})
        //     }
        // })


        // promise style
        Course.find({})
            .then(courses => res.render('home', {
                courses: multipleMongooseToObject(courses)
                // courses
                // courses: courses
                // title: 'THIS IS TITLE'
            }))
            .catch(error => next(error))

        // res.render('home')
    }

    search(req, res) {
        console.log(req.query)
        res.render('search')
    }

    searchSend(req, res) {
        console.log(req.body)
        res.send('')
    }
}

module.exports = new SiteController()
