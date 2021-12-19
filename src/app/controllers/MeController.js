const Course = require('../models/Course')
const {multipleMongooseToObject} = require('../../util/mongoose')

class MeController {

    // [GET] me/stored/courses
    storedCourses(req, res, next) {

        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) => {
              res.render('me/storedCourses', {
                  deleteCount,
                  courses: multipleMongooseToObject(courses)
              })
            })
            .catch(next)

        // Course.countDocumentsDeleted()
        //     .then((deleteCount) => {
        //         console.log('delete-count', deleteCount)
        //     })
        //     .catch(() => {});
        //
        // Course.find({})
        //     .then(courses => res.render('me/storedCourses', {
        //         courses: multipleMongooseToObject(courses)
        //     }))
        //     .catch(next)
    }

    // [GET] me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trashCourses', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next)
    }
}

module.exports = new MeController()
