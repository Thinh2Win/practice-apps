require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const {getWords, addWord} = require('./db.js');

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.get('/words', (req, res) => {
  getWords()
    .then((words)=> {
      res.send(words);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.post('/words/add', (req, res) => {
  // console.log(req.body);
  addWord(req.body)
    .then(()=> {
      res.send('word added!');
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
