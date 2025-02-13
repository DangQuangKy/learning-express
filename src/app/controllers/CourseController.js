const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
class CourseController {
    // [GET] /course/:slug
    show(req, res) {
        Course.findOne({ slug: req.params.slug })
           .then(course => {
                res.render('courses/show', { course:  mongooseToObject(course) });
            })
           .catch(err => {
                console.error(err);
                res.status(500).send('Server error');
            });
    }
    // [GET] /course/create
    create(req, res, next) {
      res.render('courses/create')
    }
    // [POST] /course/store
    store(req, res, next) {
        const course = new Course(req.body)
        course.save()
        .then(() => {
            res.redirect('/')
        })
        .catch(next);
    }
}

module.exports = new CourseController();