const CategoryRoute = require('../routes/category.route')
module.exports = function (app) {
    app.use('/category', CategoryRoute);
}