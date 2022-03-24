import React from 'react';
import axios from 'axios';
import WordsList from './wordsList.jsx';
import AddWord from './addWord.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
    };
    this.axiosGetRequest = this.axiosGetRequest.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  componentDidMount () {
    this.axiosGetRequest();
  }

  axiosGetRequest = () => {
    axios.get('/words')
    .then( response => {
      this.setState({words: response.data});
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleDeleteClick = (wordName) => {
    console.log(wordName);
  };

  render() {
    return (
      <div>
        <h1>Kitty Glossary</h1>
        <AddWord axiosGetRequest={this.axiosGetRequest}/>
        <WordsList words={this.state.words} handleDeleteClick={this.handleDeleteClick}/>
      </div>
    );
  }
}

export default App;