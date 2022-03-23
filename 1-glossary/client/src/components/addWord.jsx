import React from 'react';
import axios from 'axios';
class AddWord extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      wordText: '',
      descriptionText: '',
    }
  }
  handleOnChangeWord = (e) => {
    let holder = e.target.value;
    this.setState({wordText: holder})
  };

  handleOnChangeDescription = (e) => {
    let holder = e.target.value;
    this.setState({descriptionText: holder})
  };

  handleClick = (e) => {
    e.preventDefault();
    let addedWord = {
      word: this.state.wordText,
      description: this.state.descriptionText,
    }
    console.log(addedWord);
    axios.post('/words/add', addedWord)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render () {
    return (
      <div>
        <input type='text' placeholder='word'
        onChange={this.handleOnChangeWord}>
        </input>
        <input type='text' placeholder='description'
        onChange={this.handleOnChangeDescription}>
        </input>
        <input type='submit' value='Add Word'
        onClick={this.handleClick}>
        </input>
      </div>
    )
  }
}

export default AddWord;