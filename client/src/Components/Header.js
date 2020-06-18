import React from 'react';
import {Link} from 'react-router-dom';
const Header = ({context}) => {

  // Logged in
  if (context.authenticatedUser !==null){

    return (
    <div className="header">
        <div className="bounds">
        <a href='/'><h1 className="header--logo">Courses</h1></a>
          <nav><span>Welcome {`${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`}!</span><a className="signout" href="/signout">Sign Out</a></nav>
        </div>
    </div>
    );
  }
  else{
  // Not logged in
    return (
      <div>
          <div className="header">
            <div className="bounds">
              <a href='/'><h1 className="header--logo">Courses</h1></a>
              <nav><Link to='/signup' className="signup">Sign Up</Link><Link to='/signin' className="signin">Sign In</Link></nav>
            </div>
          </div>
      </div>
    );
    }
}

export default Header;

