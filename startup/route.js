const CategoryRoute = require('../routes/category.route');
const UserRoute = require('../routes/user.route');
module.exports = function (app) {
    app.get('/', (req, res, next) => {
        res.send('Dish app');
    })
    app.use('/user', UserRoute);
    app.use('/category', CategoryRoute);
}