import React from 'react';
import { Component } from "react";
import {Link} from 'react-router-dom'
import ValidationErrors from './ValidationErrors'


class SignIn extends Component{
  constructor(props){
    super(props);
    this.state = {emailAddress:'',password:'',errors:[]}
  }

  render(){

        
    return(


      <div className="bounds">
        <div className="grid-33 centered signin">

          <h1>Sign In</h1>
          <div>
            <form>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={this.change}/></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={this.change}/></div>
              <div className="grid-100 pad-bottom">
                <button onClick={this.submit} className="button" type="submit">Sign In</button>
                <Link to='/' className="button button-secondary">Cancel</Link>
              </div>
              <div className='validation--errors--label'>
                <ValidationErrors errors={this.state.errors}/>  
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
    </div>
    
    );
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
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/authenticated' } };
    const { emailAddress, password } = this.state;

    context.actions.signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        } else {
          // Return user to the page user was trying to view before being asked to log in.
          this.props.history.push(from);
        }
      })
      .catch((error) => {
        console.error(error);
        this.props.history.push('/error');
      });
  }






}

export default SignIn;