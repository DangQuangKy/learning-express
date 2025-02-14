const newsRouter = require('./news')
const coursesRouter = require('./courses')
const meRouter = require('./me')
const siteRouter = require('./site')
function route(app){

    app.use('/news', newsRouter)
    app.use('/courses', coursesRouter)
    app.use('/me', meRouter)
    app.use('/', siteRouter)
    app.use((req, res, next) => {
        res.status(404).render('error', { message: 'Oops! Trang bạn tìm không tồn tại.' });
    });
    
 
}

module.exports = route;