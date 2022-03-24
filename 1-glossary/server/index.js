require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const {getWords, addWord, deleteWord, seedWords, editWord} = require('./db.js');

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

app.get('/seed', (req, res) => {
  seedWords();
  res.send('Words Reset');
});

app.post('/words/add', (req, res) => {
  addWord(req.body)
    .then(()=> {
      res.send('word added!');
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.delete('/words/delete', (req, res) => {
  deleteWord(req.body.word)
    .then(response => {
      res.send('word deleted!');
    })
    .catch(err => {
      res.status(401).send(err);
    });
});

app.put('/words/change', (req, res) => {
  editWord(req.body)
    .then(()=> {
      res.send('Word Changed');
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
