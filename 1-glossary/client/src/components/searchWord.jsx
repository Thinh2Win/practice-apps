import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    }
  }

  handleSeachChange = (e) => {
    this.setState({searchText: e.target.value});
  };

  render () {
    return(
      <div>
        <label>
          Search:
          <input type='text' onChange={this.handleSeachChange}/>
        </label>
          <input type='submit' value='Find!'
          onClick={() => {this.props.handleSearchClick(this.state.searchText)}}/>
      </div>
    )
  }
};

export default Search;