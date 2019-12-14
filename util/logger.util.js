const winston = require('winston');
winston.emitErrs = true;

let loggerLevel = process.env.LOGGER_LEVEL || "debug";

let logger = new( winston.Logger )( {
    transports: [
        new winston.transports.Console( {
            level: loggerLevel,
            colorize: true,
            json:false
        } )
    ],
    exceptionHandlers: [
        new winston.transports.Console( {
            level: 'error',
            colorize: true,
            json:false
        } )]
} );

module.exports = logger;
