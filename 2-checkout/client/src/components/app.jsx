import React from 'react';
import Form1 from './form1.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkout: false,
    }
    this.returnHome = this.returnHome.bind(this);
  }

  changeOnClick = (e) => {
    let btnName = e.target.name;
    console.log(btnName);
    this.setState({[`${btnName}`]: !this.state.checkout})
  }

  returnHome = () => {
    this.setState({checkout: true});
  };

  render () {
    return (
      <div>

        {this.state.checkout ?
          (<Form1/>) : (
            <div>
            <h1>Home Page</h1>
            <button name='checkout' onClick={()=>{this.changeOnClick(event)}}>checkout</button>
            </div>
          )
        }

        <p>
          <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
        </p>
        
      </div>
    )
  }
}

export default App;