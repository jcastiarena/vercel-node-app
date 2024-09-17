// Define default log settings
const config = {
  logDir: process.env.LOG_DIR || 'logs', // Default directory for log files
  logFile: process.env.LOG_FILE || 'app.log', // Default log filename
  logLevel: process.env.LOG_LEVEL || 'info' // Default log level
};

export default config;
