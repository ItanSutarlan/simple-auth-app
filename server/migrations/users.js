require('dotenv').config();
const pool = require('../config/config');

const dropTableQuery = 'DROP TABLE IF EXISTS users';
const createTableQuery = `
  CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INT NOT NULL
  )
`;

pool.query(dropTableQuery, (err) => {
  if (err) {
    console.error('Error dropping user table: ', err);
    pool.end();
    return;
  }

  pool.query(createTableQuery, (err) => {
    pool.end();
    if (err) {
      console.error('Error creating user table: ', err);
    } else {
      console.log('Users table created successfully');
    }
  });
});