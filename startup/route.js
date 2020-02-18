const CategoryRoute = require('../routes/category.route')
module.exports = function (app) {
    app.use('/', (req, res, next) => {
        res.send('Dish app')
    })
    app.use('/category', CategoryRoute);
}