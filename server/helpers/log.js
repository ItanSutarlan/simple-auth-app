const fs = require('fs');
const path = require('path');

// Create a log file
const logStream = fs.createWriteStream(path.resolve(__dirname, '../logs/database.log'), { flags: 'a' });

module.exports = function logDatabaseInteraction(query, parameters) {
  const logEntry = `${new Date().toISOString()} - Query: ${query}, Parameters: ${parameters}\n`;
  logStream.write(logEntry);
}