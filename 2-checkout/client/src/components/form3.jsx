import React from 'react';
import FinalForm from './finalForm.jsx';
import axios from 'axios';

class Form3 extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      next: false,
      creditCard: '',
      expDate: '',
      cvv: '',
      billingZipCode: ''
    }
  }
  handleForm3Change = (e) => {
    this.setState({[`${e.target.name}`]: e.target.value})
  };

  handleForm3Click = () => {
    let paymentInfo = {
      creditCard: this.state.creditCard,
      expDate: this.state.expDate,
      cvv: this.state.cvv,
      billingZipCode:this.state.billingZipCode
    }
    axios.put('/user/payment', paymentInfo)
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
          <FinalForm returnHome={this.props.returnHome}/>
          ) : (
            <div>
              <h1>Please Enter Payment Info</h1>
              <input type='text' name='creditCard' placeholder= 'credit card number' onChange={() => {this.handleForm3Change(event)}}/>
              <input type='text' name='expDate' placeholder= 'exp date' onChange={() => {this.handleForm3Change(event)}}/>
              <input type='text' name='cvv' placeholder= 'cvv' onChange={() => {this.handleForm3Change(event)}}/>
              <input type='text' name='billingZipCode' placeholder= 'billing zip code' onChange={() => {this.handleForm3Change(event)}}/>
              <button onClick={() => {this.handleForm3Click()}}>Next</button>
            </div>
          )
        }
      </div>

    )
  }
}

export default Form3;