const pool = require('../config/config');
const { hashPassword } = require('../helpers/bcrypt');
const logDatabaseInteraction = require('../helpers/log');

class Model {
  static getUsers() {
    return new Promise((resolve, reject) => {
      const query = 'CALL get_all_users()';
      pool.query(query, (err, results) => {
        if (err) {
          console.error('Error retrieving users: ', err);
          reject({ error: 'Error retrieving users' });
        } else {
          logDatabaseInteraction(query, []);
          resolve(results[0])
        }
      });
    })
  }

  static findUserByUsername(username) {
    return new Promise((resolve, reject) => {
      const query = 'CALL find_user_by_username(?)';
      pool.query(query, [username], (err, results) => {
        if (err) {
          console.error('Error retrieving users: ', err);
          reject({ error: 'Error retrieving users' });
        } else {
          logDatabaseInteraction(query, [username]);
          resolve(results[0][0])
        }
      });
    })
  }
  
  static createUser({ username, password, age }) {
    const hashedPassword = hashPassword(password);
    return new Promise((resolve, reject) => {
      const query = 'CALL create_user(?, ?, ?)';
      pool.query(query, [username, hashedPassword, age], (err, results) => {
        if (err) {
          console.error('Error creating user: ', err);
          reject({ error: 'Error creating user' });
        } else {
          logDatabaseInteraction(query, [username, hashedPassword, age]);
          resolve({ message: 'User created successfully' });
        }
      });
    })
  }
}

module.exports = Model;