import React from 'react';

const Test = ({context}) => {

  const deleteCourse = async (e) => {
    e.preventDefault();
    const username = authenticatedUser.emailAddress;
    const password = authenticatedUser.password;
    console.log(`calling delete course in course detail with ${username} ${password}`)
    await context.userController.deleteCourse(`/courses/1`,username,password);
 
  }

  const getUser = (e) => {
    e.preventDefault();
    const user = context.userController.getUser(authenticatedUser.emailAddress,authenticatedUser.password)

    console.log(user);
  }
  

 var {authenticatedUser} = context;
 
  if (authenticatedUser !==null){

    return ( 
    
    
    <div>
      <h1>Test Page Logged in</h1>
      <p>{authenticatedUser.emailAddress}</p>
      <p>{authenticatedUser.password}</p>
    
    
      <button onClick={deleteCourse}>Delete course 1</button><br/>
      <button onClick={getUser}>Get User</button>

    </div>
      
      
      
      
      );
  }
  else{
    return  (<div><h1>Test Page Not Logged in</h1></div>);
  }


}

export default Test;