const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class SiteController {

    // [GET] /
    async index(req, res, next) {
       try {
        // lay so trang tu query params (neu khong co thi lay mac dinh la 1)
        let page = parseInt(req.query.page) || 1;
        // so khoa hoc tren 1 trang
        let limit = parseInt(req.query.limit) || 3;
        // so khoa hoc bo qua
        let skip = (page - 1) * limit;
        // lay danh sach khoa hoc co phan trang 
        const courses = await Course.find({})
        .skip(skip)
        .limit(limit);

        // dem tong so khoa hoc de tinh tong so trang
        const totalCourses = await Course.countDocuments({});
        const totalPages = Math.ceil(totalCourses / limit);

        // tao danh sach so cac trang 
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push({
                number: i,
                isActive: i === page
            })}
        
        res.render('home', {
            courses: mutipleMongooseToObject(courses),
            totalPages: totalPages,
            currentPage: page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page - 1,
            nextPage: page + 1,
            pages: pages
        });
       } catch (error) {
        next(error)
       }
    }

    // [GET] /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController();