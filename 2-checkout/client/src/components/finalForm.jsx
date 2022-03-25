import React from 'react';

class FinalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  getAllInfo = () => {
    //axios.get('/user/info)
    // get all user info and display
  }
  render () {
    return (
      <div>
        <UserDisplay/>
        <button onClick={() => {this.props.returnHome()}}>Purchace</button>
      </div>
    )
  }
}

var UserDisplay = (props) => (
  <div>
    hello this is the user display
  </div>
)
export default FinalForm;