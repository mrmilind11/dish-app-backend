const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../startup/errorHandler');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return next(new ErrorHandler(403, 'No token provided'))
    try {
        const userData = jwt.verify(token, process.env.jwtKey)
        req.userData = userData;
        next();
    }
    catch (error) {
        next(new ErrorHandler(403, error.message));
    }
}