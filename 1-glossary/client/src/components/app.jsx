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
  }
  componentDidMount () {
    axios.get('/words')
      .then( response => {
        this.setState({words: response.data});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Kitty Glossary</h1>
        <AddWord/>
        <WordsList words={this.state.words}/>
      </div>
    );
  }
}

export default App;