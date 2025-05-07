const winston = require('winston');
const { format } = winston;

let logLevel = process.env.DEBUG === 'true' ? 'debug' : 'info';

const logger = winston.createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new winston.transports.Console({
            level: logLevel
        })
    ]
});

module.exports = logger;
