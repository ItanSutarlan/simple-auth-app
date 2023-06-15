require("dotenv").config();
const fs = require("fs");
const express = require("express");
const cors = require("cors");

const pool = require('./config/config')
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const port = 3000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.use(errorHandler);

app.listen(port, () => {
  fs.mkdir('./logs', { recursive: true }, (err) => { if (err) throw err; });
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database: ', err);
      return;
    }
  
    const createProcedure = `
      CREATE PROCEDURE IF NOT EXISTS create_user(IN p_username VARCHAR(255), IN p_password VARCHAR(255), IN p_age INT)
      BEGIN
        INSERT INTO users (username, password, age) VALUES (p_username, p_password, p_age);
      END
    `;
  
    const getAllProcedure = `
      CREATE PROCEDURE IF NOT EXISTS get_all_users()
      BEGIN
        SELECT * FROM users;
      END
    `;

    const getOneProcedure = `
      CREATE PROCEDURE IF NOT EXISTS find_user_by_username(IN p_username VARCHAR(255))
      BEGIN
        SELECT * FROM users WHERE username = p_username;
      END
    `;
  
    connection.query(createProcedure, (err) => {
      if (err) {
        console.error('Error creating create_user procedure: ', err);
        return;
      }
      console.log('create_user procedure created');
    });
  
    connection.query(getAllProcedure, (err) => {
      if (err) {
        console.error('Error creating get_all_users procedure: ', err);
        return;
      }
      console.log('get_all_users procedure created');
    });

    connection.query(getOneProcedure, (err) => {
      if (err) {
        console.error('Error creating find_user_by_username procedure: ', err);
        return;
      }
      console.log('find_user_by_username procedure created');
    });
  
    connection.release();
  });

  console.log(`Example app listening on port ${port}`)
})
