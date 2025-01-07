import { createLogger, format, transports } from 'winston';
import * as path from 'path';

// Define log format
const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf((info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
);

// Create step logger
const stepLogger = createLogger({
    level: 'info',
    format: format.combine(
        format.label({ label: 'STEP' }),
        logFormat
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.label({ label: 'STEP' }),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.printf((info) => `${info.timestamp} [${info.label}] [${info.level.toUpperCase()}]: ${info.message}`)
            )
        }),
        new transports.File({ filename: path.join(__dirname, '../logs/test.log') }),
    ],
});

// Create action logger
const actionLogger = createLogger({
    level: 'info',
    format: format.combine(
        format.label({ label: 'ACTION' }),
        logFormat
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.label({ label: 'ACTION' }),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.printf((info) => `${info.timestamp} [${info.label}] [${info.level.toUpperCase()}]: ${info.message}`)
            )
        }),
        new transports.File({ filename: path.join(__dirname, '../logs/test.log') }),
    ],
});

// Export loggers
export { stepLogger, actionLogger };
