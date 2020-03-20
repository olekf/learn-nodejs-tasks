import winston from 'winston';

export const logger = new winston.createLogger({
    transports: [
        new winston.transports.Console({
            timestamp: true,
            colorize: true,
            level: 'info'
        }),
        new winston.transports.File({
            filename: 'debug.log',
            name: 'debug',
            level: 'debug'
        }),
        new winston.transports.File({
            filename: 'error.log',
            name: 'error',
            level: 'error'
        })
    ]
});
