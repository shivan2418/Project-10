import React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom';
import config from '../config';
const ReactMarkdown = require('react-markdown');

class CourseDetail extends Component{

  constructor(){
    super();
    this.state = {course:null}
  }


  componentDidMount(){
    fetch(`${config.apiBaseUrl}/courses/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(res => this.setState({course:res}))

  }

  deleteCourse = (e) => {
    e.preventDefault();
    const {context} = this.props;
    const username = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;
    console.log(`calling delete course in course detail with ${username} ${password}`)
    context.userController.deleteCourse(`/courses/${this.state.course.id}`,username,password);

  
  }

  render() {
    if (this.state.course){

      const {context} = this.props;

      var actionBars = null;
      // Only render the action bars if the user is logged in
      if (context.authenticatedUser!== null && context.authenticatedUser.id === this.state.course.id){
          actionBars = <>
                <a href='javascript;' onClick={this.deleteCourse}>delete</a>
                {/* <Link to= {`/courses/${this.state.course.id}/update`} className="button">Update Course</Link> */}
                <Link to= {`/courses/${this.state.course.id}/delete`}  className="button">Delete Course !</Link>
            </>
      }

      return (
        <>
       <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                {actionBars}
              </span>
              <Link to='/' className="button button-secondary">Return to List</Link></div>
          </div>
        </div>

        <div className="bounds course--detail">
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{this.state.course.title}</h3>
                    <p>By {this.state.course.User.firstName} {this.state.course.User.lastName}</p>
                  </div>
                  <div className="course--description">
                    <ReactMarkdown source={this.state.course.description}/>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{this.state.course.estimatedTime}</h3>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ReactMarkdown source={this.state.course.materialsNeeded}/>
                      </li>
                    </ul>
                  </div>
                </div>
        </div>
        </>

      );
    }

    else{
      return "Loading..."
    }

  }


}

export default CourseDetail