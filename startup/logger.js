const { createLogger, transports } = require('winston')
module.exports = function () {
    const logger = createLogger({
        transports: [
            new transports.File({ filename: 'errors.log' }),
            new transports.Console()
        ]
    })
    logger.exceptions.handle(new transports.File({ filename: 'exceptions.log' }));

    process.on('uncaughtException', (ex) => {
        console.log(ex);
        process.exit(1);
    })
}