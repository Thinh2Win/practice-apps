import React from 'react';

class Form2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: ''
    }
  }

  handleForm2Change = (e) => {
    let inputBox = e.target.name;
    this.setState({[`${inputBox}`]: e.target.value})
  };
  
  render () {
    return (
      <div>
        this is form 2
        <div>
          <input name='line1' placeholder='line1' onChange={() => {this.handleForm2Change(event)}}></input>
          <input name='line2' placeholder='line2' onChange={() => {this.handleForm2Change(event)}}></input>
          <input name='city' placeholder='city' onChange={() => {this.handleForm2Change(event)}}></input>
          <input name='state' placeholder='state' onChange={() => {this.handleForm2Change(event)}}></input>
          <input name='zipCode' placeholder='zip code' onChange={() => {this.handleForm2Change(event)}}></input>
        </div>
      </div>
    )
  }
}

export default Form2;