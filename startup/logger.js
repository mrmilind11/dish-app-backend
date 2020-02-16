const { winston, transports, createLogger } = require('winston')
module.exports = function () {
    const logger = createLogger({
        level: 'info',
        transports: [
            new transports.File({ filename: 'errors.log' }),
            new transports.Console()
        ]
    })
    logger.exceptions.handle(new transports.File({ filename: 'exceptions.log' }));



    process.on('unhandledRejection', (error) => {
        winston.error(error);
        process.exit(1);
    })
    process.on('uncaughtException', (error) => {
        winston.error(error);
    })
}