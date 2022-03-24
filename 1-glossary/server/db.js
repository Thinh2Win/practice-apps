const mongoose = require('mongoose');
require('dotenv').config();

// 1. Use mongoose to establish a connection to MongoDB
var db = `mongodb://localhost:27017/${process.env.DB_NAME}`;

mongoose.connect(db,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(err => {
    console.log(err);
  });

// 2. Set up any schema and models needed by the app
let glossarySchema = mongoose.Schema({
  word: {
    type: String,
    unique: true,
  },
  description: String,
});

let Glossary = mongoose.model('Glossary', glossarySchema);

//--------> Helper Functions <----------//
let seedWords = () => {
  var words = [ {word: 'toe beans', description: 'pads on a cats paw'},
    {word: 'ooo big stretch', description: 'must say phrase when a cat stretches'},
    {word: 'chonker', description: 'an especially husky kitty cat'},
    {word: 'long boi', description: 'an exceptionally long kitty cat'},
    {word: 'meatball', description: 'name of Thinhs kitty cat'},
  ];
  words.forEach((word) => {
    new Glossary({word: word.word, description: word.description}).save()
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  });
};

let getWords = () => {
  return Glossary.find();
};

let addWord = (jsonObj) => {
  return new Glossary({word: jsonObj.word, description: jsonObj.description}).save();
};

let deleteWord = (deleteWord) => {
  return Glossary.deleteOne({word: `${deleteWord}`});
};

module.exports.getWords = getWords;
module.exports.addWord = addWord;
module.exports.deleteWord = deleteWord;

// 3. Export the models
// 4. Import the models into any modules that need them
