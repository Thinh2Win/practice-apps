const mongoose = require('mongoose');
require('dotenv').config();

// 1. Use mongoose to establish a connection to MongoDB
//              'mongodb://localhost:27017'
var db = `mongodb://localhost:27017/${process.env.DB_NAME}`;

mongoose.connect(db,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('connected to MongoDB');
      // seedWords();
    }
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
// const testWord = new Glossary({word: 'hello', description: 'world'});
// testWord.save();
// console.log(testWord);
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


// 3. Export the models
// 4. Import the models into any modules that need them
