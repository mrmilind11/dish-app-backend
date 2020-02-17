class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
const handleError = (err, res) => {
    console.log('**error**', err.message);
    const { statusCode, message } = err;
    res.status(statusCode || 500).send({
        message: (message || 'Internal server error')
    })
}
module.exports = { ErrorHandler, handleError }