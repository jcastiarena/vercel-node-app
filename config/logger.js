import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './loggerConfig.js';
import DailyRotateFile from 'winston-daily-rotate-file';

// Create log directory if it doesn't exist
import fs from 'fs';
if (!fs.existsSync(config.logDir)) {
  fs.mkdirSync(config.logDir);
}

const { format, transports, createLogger } = winston;
const { combine, timestamp, printf } = format;

// Function to get the current file's name in ES modules
const getCurrentFilename = (importMetaUrl) => {
  const __filename = fileURLToPath(importMetaUrl);
  return path.basename(__filename);
};

// Function to get the current file's name in ES modules
export default (filePath) => {
  const fileName = getCurrentFilename(filePath);

  const customFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level.toUpperCase()}] ${fileName}: ${stack || message}`;
  });

  
  // Initialize the Winston logger
  const logger = createLogger({
    level: 'info',
    maxsize: '500m',
    format: format.combine(
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss' // Custom timestamp format
      }),
      format.errors({ stack: true }),
      format.splat(),
      customFormat
    ),
    transports: [
      new transports.Console(), // Log to console
      // new transports.File({ filename: path.join(config.logDir, config.logFile) }), // Log to a file
      new DailyRotateFile({
        filename: path.join(config.logDir, config.logFile),
        maxSize: "1g",
        maxDays: "3d",
        zippedArchive: true,
        datePattern: 'YYYY-MM-DD'
      })
    ],
  })
    
  // Log also to console if not in production
  if (process.env.NODE_ENV === "development") {
    loggerInstance.add(
      new transports.Console({
        format: combine(colorize(), customFormat),
      })
    );
  }

  return logger;
};