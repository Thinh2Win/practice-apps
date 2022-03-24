import React from 'react';
import axios from 'axios';
import WordsList from './wordsList.jsx';
import AddWord from './addWord.jsx';
import Search from './searchWord.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
    };
    this.axiosGetRequest = this.axiosGetRequest.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
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
    var deletedWord = {data: {word: wordName}};
    axios.delete('/words/delete', deletedWord)
      .then(response => {
        console.log(response);
        this.axiosGetRequest();
      })
      .catch(err => {
        console.log(err)
      });
  };

  reSeedFrontEnd = () => {
    axios.get('/seed')
      .then(response => {
        console.log(response);
        this.axiosGetRequest();
      })
      .catch(err => {
        console.log(err);
      })
  };

  handleSearchClick = (searchedWord) => {
    var filteredWords = this.state.words.filter(word => {
      if (word.word.toLowerCase().includes(searchedWord)) {
        return word;
      }
    });
    this.setState({words: filteredWords});
  };

  render() {
    return (
      <div>
        <h1 onClick={this.reSeedFrontEnd}>Kitty Glossary</h1>
        <Search handleSearchClick={this.handleSearchClick}/>
        <AddWord axiosGetRequest={this.axiosGetRequest}/>
        <WordsList words={this.state.words} handleDeleteClick={this.handleDeleteClick}/>
      </div>
    );
  }
}

export default App;