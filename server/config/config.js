const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'users'
});

module.exports = pool;
