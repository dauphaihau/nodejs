const Course = require('../models/Course')
// const {multipleMongooseToObject} = require('../../util/mongoose')
const {mongooseToObject} = require('../../util/mongoose')

class CoursesController {

    // [GET] /courses/:slug
    show(req, res, next) {
        // res.send('SHow courses')
        Course.findOne({slug: req.params.slug})
            .then(courses =>
                    res.render('courses/show', {courses: mongooseToObject(courses)})
                // res.json(courses)
            )
            .catch(next)
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [POST] /courses/store
    store(req, res, next) {
        // res.json(req.body)

        const formData = req.body;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('me/stored/courses'))
            .catch(next);

        // res.send('COURSE SAVED!')
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next)
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        // res.json(req.body)
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('me/stored/courses'))
            .catch(next)
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        // res.json(req.body)
        switch (req.body.action) {
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default :
                res.json({message: 'Action is invalid !'})

        }
    }


}

module.exports = new CoursesController()
