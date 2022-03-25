const mysql = require('mysql2');
const Promise = require('bluebird');
require('dotenv').config();
// Configure process.env variables in ../.env

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
            name VARCHAR(25) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(50) NOT NULL,
            line1 VARCHAR(50) NOT NULL,
            line2 VARCHAR(50) NOT NULL,
            city VARCHAR(50) NOT NULL,
            state VARCHAR(50) NOT NULL,
            zipCode VARCHAR(50) NOT NULL,
            creditCard INT(16) NOT NULL,
            expDate INT(4) NOT NULL,
            cvv INT(3) NOT NULL,
            billingZipCode INT(5) NOT NULL
          )`
        )
      )
  ).catch((err) => console.log(err));

module.exports = db;
