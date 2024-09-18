import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './loggerConfig.js';
import DailyRotateFile from 'winston-daily-rotate-file';

const { format, createLogger } = winston;
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

  const transports = [];

  // Add console for all environments
  transports.push(
    new winston.transports.Console({
      format: combine(customFormat),
    })
  );

  // Conditionally add DailyRotateFile in local environment
  if (process.env.NODE_ENV === 'development' || process.env.LOG_ROTATION === 'true') {
    transports.push(
      new DailyRotateFile({
        filename: path.join(config.logDir, config.logFile),
        datePattern: 'YYYY-MM-DD',
        maxSize: "1g",
        maxDays: "3d",
        zippedArchive: true,
      })
    );
  }

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
    transports,
  })
    
  // // Log also to console if not in production
  // if (process.env.NODE_ENV === "development") {
  //   loggerInstance.add(
  //     new transports.Console({
  //       format: combine(colorize(), customFormat),
  //     })
  //   );
  // }

  return logger;
};