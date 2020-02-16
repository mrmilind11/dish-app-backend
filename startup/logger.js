const { transports, createLogger } = require('winston')
module.exports = function () {
    const logger = createLogger({
        transports: [
            new transports.File({ filename: 'errors.log' })
        ]
    })
    logger.exceptions.handle(new transports.File({ filename: 'exceptions.log' }));
}