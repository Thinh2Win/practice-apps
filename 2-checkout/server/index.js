require('dotenv').config();
const express = require('express');
const path = require('path');
const sessionHandler = require('./middleware/session-handler');
const logger = require('./middleware/logger');

// Establishes connection to the database on server start
const db = require('./db');

const app = express();

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

// -------------> Request Handelers <------------- //
//Form1 userInfo
app.post('/user', (req, res) => {
  db.queryAsync(`INSERT INTO responses (name, email, password)
  Values ('${req.body.name}', '${req.body.email}', '${req.body.password}')`
  )
    .then(()=> {
      res.send(req.body);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

//Form2 ShippingInfo
app.put('/user/shipping', (req, res) => {
  let data = req.body;
  db.queryAsync(`UPDATE responses SET
    line1='${data.line1}',
    line2='${data.line2}',
    city='${data.city}',
    state='${data.state}',
    zipCode='${data.zipCode}',
    phoneNumber='${data.phoneNumber}'
  `) .then(() => {
    res.send(req.body);
  })
    .catch(err => {
      res.status(400).send(err);
    });
});


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
