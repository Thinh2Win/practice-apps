import React from 'react';
import Form3 from './form3.jsx';
import axios from 'axios';

class Form2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: false,
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

  handleForm2Click = () => {
    let shippingInfo = {
      line1: this.state.line1,
      line2: this.state.line2,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      phoneNumber: this.state.phoneNumber
    };
    axios.put('/user/shipping', shippingInfo)
      .then(() => {
        this.setState({next: !this.state.next})
      })
      .catch(err => {
        console.log(err);
      });
  };

  render () {
    return (
      <div>
        {this.state.next ? (
          <Form3 returnHome={this.props.returnHome}/>
            ) : (
          <div>
          <h1>Please Enter Shipping Info</h1>

          <div className='form'>
          <input name='line1' placeholder='line1' onChange={() => {this.handleForm2Change(event)}}></input>
          <input name='line2' placeholder='line2' onChange={() => {this.handleForm2Change(event)}}></input>
          <input name='city' placeholder='city' onChange={() => {this.handleForm2Change(event)}}></input>
          <input name='state' placeholder='state' onChange={() => {this.handleForm2Change(event)}}></input>
          <input name='zipCode' placeholder='zip code' onChange={() => {this.handleForm2Change(event)}}></input>
          </div>

          <input name='phoneNumber' placeholder='Phone Number' onChange={()=>{this.handleForm2Change(event)}}/>
          <button onClick={() => {this.handleForm2Click()}}>Next</button>
        </div>
          )
        }
      </div>
    )
  }
}

export default Form2;