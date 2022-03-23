import React from 'react';

var WordsList = (props) => (
  <div>
    {props.words.map(word => <WordsDisplay key={word._id} wordObj={word}/>)}
  </div>
)

var WordsDisplay = (props) => (
  <div>
    <h3>Word: {props.wordObj.word}</h3>
    <p>Definition: {props.wordObj.description}</p>
  </div>
)
export default WordsList;