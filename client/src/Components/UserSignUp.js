import React from 'react';
import { Component } from "react";
import {Link} from 'react-router-dom';

class UserSignUp extends Component{

constructor(props){
  super(props)
  this.state = {firstName:'',lastName:'',emailAddress:'',password:'',confirmPassword:"",errors:[]}
}

change = (event) => {
  const name = event.target.name;
  const value = event.target.value;

  this.setState(() => {
    return {
      [name]: value
    };
  });
}

cancel = () => {
  this.props.history.push('/');
 }

submit = (e) => {
  e.preventDefault();

  if (this.state.password !== this.state.confirmPassword){
    this.setState({errors:['Passwords do not match!']})
  } else{

  const {context} = this.props;

  const {
    firstName,
    lastName,
    emailAddress,
    password,
  } = this.state; 

  // New user payload
  const user = {
    firstName,
    lastName,
    emailAddress,
    password,
  };

  context.userController.createUser(user)
    .then( errors => {
      if (errors.length) {
        this.setState( {errors});
      } else {
        context.actions.signIn(emailAddress,password)
        .then( () => {this.props.history.push('/authenticated')}  );
      }
      })
    .catch( err => { // handle rejected promises
      console.log(err);
      this.props.history.push('/error'); // push to history stack
    })
  }

}

render() {

  let errors = null;
  if (this.state.errors.length){

    errors = 

     <div className="validation--errors--label">
        <ul className='validation-errors'>

            {this.state.errors.map( (err,index) => <li key={index}>{err}</li>)}
        </ul>
    </div>
  }

  return (

    <div className="grid-33 centered signin">
      <h1>Sign Up</h1>
      <div>
        {errors}
        <form>
          <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={this.state.firstName} onChange={this.change}/></div>
          <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={this.state.lastName} onChange={this.change}/></div>
          <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={this.change}/></div>
          <div><input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={this.change}/></div>
          <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.change}/></div>
          <div className="grid-100 pad-bottom"><button className="button" onClick={this.submit}>Sign Up</button>
          <button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
        </form>
      </div>
      <p>&nbsp;</p>
      <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
    </div>
  )

}

}

export default UserSignUp;