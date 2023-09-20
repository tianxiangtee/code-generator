import { createLogger, transports, format } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
const fs = require('fs')

// Create the log directory if it doesn't exist
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create a logger for error messages
const errorTransport = new DailyRotateFile({
  filename: `${logDir}/error-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d',
  level: 'error', // Log only error-level messages
});

export const errorLogger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [errorTransport],
});

// Create a separate logger for info messages
const infoTransport = new DailyRotateFile({
  filename: `${logDir}/info-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d',
  level: 'info', // Log only info-level messages
});

export const infoLogger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [infoTransport],
});
