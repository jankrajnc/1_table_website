const winston = require('winston');
require('dotenv').config();

// Creates and returns a logger used in development.
function devLogger() {

    // Format the logging message.
    const devLogFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
        return `[${timestamp}] - [${level}]: ${stack || message}`;
    });

    // Set the logging options.
    const devLogger = winston.createLogger({
        level: process.env.LOGGING_LEVEL,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.errors({ stack: true }),
            devLogFormat
        ),
        transports: [
            new winston.transports.Console()
        ],
    });

    return devLogger;
}

// Creates and returns a logger used in production.
function productionLogger() {
    const prodLogger = winston.createLogger({
        level: process.env.LOGGING_LEVEL,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json()
        ),
        transports: [
            new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: './logs/combined.log' }),
        ],
    });

    return prodLogger;
}

function getLogger() {
    if (process.env.NODE_ENV === 'production') {
        return productionLogger();
    } else {
        return devLogger();
    }
}

module.exports = {
    getLogger
};
