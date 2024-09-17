import logger from './config/logger.js';
import { fileURLToPath } from 'url';
import { basename } from 'path';

// Get the file name without the full path
// const filename = basename(fileURLToPath(import.meta.url));
const log = logger(import.meta.url);

// Test the logger with a custom message
log.info('This is a test log message');
log.debug('This is a test log message');
log.warn('This is a test log message');
