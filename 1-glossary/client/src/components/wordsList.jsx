import React from 'react';
import axios from 'axios';
var WordsList = (props) => (
  <div>
    {props.words.map(word => <WordsDisplay key={word._id} wordObj={word} handleDeleteClick={props.handleDeleteClick}/>)}
  </div>
)

class WordsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      defaultDef: this.props.wordObj.description,
      newDef: '',
    }
  }

  handleNewWordChange = (e) => {
    this.setState({newDef: e.target.value})
  };

  handleNewWordClick = () => {
    this.setState({
      defaultDef: this.state.newDef,
      editing: false,
    })
    let currentWord = this.props.wordObj.word;
    let editDef = this.state.newDef;
    let defObj = {word: currentWord, description: editDef}

    axios.put('/words/change', defObj)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return(

      <div>
        <h3>Word: {this.props.wordObj.word}</h3>
        {this.state.editing ?
        (
          <div>
          <input type='text' onChange={this.handleNewWordChange}/>
          <input type='submit' value='change' onClick={()=>{
            this.handleNewWordClick()
          }}/>
          </div>
        ) : (
        <p>Definition: {this.state.defaultDef}</p>
            )}
        <button onClick={() => {this.props.handleDeleteClick(this.props.wordObj.word)}}>
          Delete Word
        </button>
        <button onClick={() => {
          this.setState({editing: true});
        }}>Edit</button>
      </div>
    )
  }
}


export default WordsList;