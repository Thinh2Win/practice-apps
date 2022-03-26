import React from 'react';
import axios from 'axios';

class FinalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    }
  }

  componentDidMount() {
    axios.get('/user/summary')
      .then(summary => {
        this.setState({userInfo: summary.data});
      });
  }




  render () {
    var info = [];
    for (let keys in this.state.userInfo) {
      info.push(<span> {keys}: {this.state.userInfo[keys]}</span>)
    }

    return (
      <div>
        <h4>is this info correct?</h4>
        <div className='form'>
          {info}
        </div>
        <button onClick={() => {this.props.returnHome()}}>Purchace</button>
      </div>
    )
  }
}

export default FinalForm;

