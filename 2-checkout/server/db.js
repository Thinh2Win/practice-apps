const mysql = require('mysql2');
const Promise = require('bluebird');
// Configure process.env variables in ../.env
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  // database: process.env.DB_NAME,
});


const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`),
    db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
      .then(()=> {
        db.queryAsync('USE checkout');
      })
      .then(() =>
      // Expand this table definition as needed:
        db.queryAsync(
          `CREATE TABLE IF NOT EXISTS responses (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(25),
            email VARCHAR(50),
            password VARCHAR(50),
            line1 VARCHAR(50),
            line2 VARCHAR(50),
            city VARCHAR(50),
            state VARCHAR(50),
            zipCode VARCHAR(50),
            phoneNumber VARCHAR(12),
            creditCard INT(16),
            expDate INT(4),
            cvv INT(3),
            billingZipCode INT(5)
          )`
        )
      )
  ).catch((err) => console.log(err));

module.exports = db;
