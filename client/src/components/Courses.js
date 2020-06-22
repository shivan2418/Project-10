import React, { Component } from 'react'
import config from '../config';
import { Link } from 'react-router-dom';

class Courses extends Component {
 
  constructor() {
    super();
    this.state = {courses:null};
  }

  componentDidMount(){

    const {context} = this.props;
    context.userController.getCourses()
    .then( res => this.setState({courses:res}))
    .catch(err => this.props.history.push('/error'));
    }
  
  render(){
    var coursesList;

    if(this.state.courses){
          // Make the list of the courses
          coursesList = this.state.courses.map( (item,index) => {
            return (
            <div key={index} className="grid-33"><Link to={`/courses/${item.id}`} className="course--module course--link">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{item.title}</h3>
                </Link>
             </div>);
          });

          return(
              <div className="bounds">
                {/* courses */}
                {coursesList}
                {/* add course button */}
                <div className="grid-33">
                    <Link to='/courses/create' className="course--module course--add--module" href="create-course.html">
                      <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                      </svg>New Course</h3>
                      </Link>
                </div>
              </div>  

          );

    }else{
      return 'Loading...';
    }


    

  }

}

export default Courses;