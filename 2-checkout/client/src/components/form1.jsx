import React from 'react';
import Form2 from './form2.jsx';
import axios from 'axios';

class Form1 extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      next: false,
      name: '',
      email: '',
      password: '',
    }
  }
  handleForm1Change = (e) => {
    let inputBox = e.target.placeholder;
    this.setState({[`${inputBox}`]: e.target.value})
  };

  handleForm1Click = () => {
    var userInfo = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    axios.post('/user', userInfo)
      .then(()=> {
        this.setState({next: !this.state.next})
      })
      .catch(err => {
        console.log(err);
      });
  }

  render () {
    return (
      <div>
        {this.state.next ? (
          <Form2 returnHome={this.props.returnHome}/>
          ) : (
          <div className='form'>
          <h1>Please Enter Account Info</h1>
          <input type='text' placeholder='name' onChange={()=> {this.handleForm1Change(event)}}/>
          <input type='text' placeholder='email' onChange={() => {this.handleForm1Change(event)}}/>
          <input type='text' placeholder='password' onChange={() => {this.handleForm1Change(event)}}/>
          <button onClick={() => {this.handleForm1Click()}}>Next</button>
          </div>
          )
        }
      </div>
    )
  }
};

export default Form1;