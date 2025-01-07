import { createLogger, format, transports } from 'winston';
import * as path from 'path';

// Define log format
const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf((info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
);

// Create logger instance
const logger = createLogger({
    level: 'info', 
    format: logFormat,
    transports: [
        // WWrite console log
        new transports.Console(),
        // WWrite log to log file
        new transports.File({ filename: path.join(__dirname, '../logs/test.log') }),
    ],
});

// Export log
export default logger;
