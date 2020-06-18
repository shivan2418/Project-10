import React from "react";
import config from '../config';
const { Component } = require("react");

class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = { course: null };
  }


    componentDidMount(){ 
      fetch(`${config.apiBaseUrl}/courses/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(res => this.setState({course:res}))
    }


    change = (event) => {
      const name = event.target.name;
      const value = event.target.value;
    
      this.setState( (currentState) => {

        currentState.course[name]=value
        return {
          course:currentState.course
        };
      });
    }

    submit = () =>{

    }

    cancel = () => {
      this.props.history.push(`/courses/${this.state.course.id}`)
    }


  render() {
    if (this.state.course) {
      return (
        <>

<div className="bounds course--detail">
          <h1>Update Course</h1>
          <div>
            <form>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="input-title course--title--input"
                      placeholder="Course title..."
                      value={this.state.course.title}
                      onChange={this.change}
                    />
                  </div>

                  <p>By {this.state.course.User.firstName} {this.state.course.User.lastName}</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.change} value=  {this.state.course.description}>
                    </textarea>
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          className="course--time--input"
                          placeholder="Hours"
                          value={this.state.course.estimatedTime}
                          onChange={this.change}
                        />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea  id="materialsNeeded" name="materialsNeeded"  className=""  placeholder="List materials..." onChange={this.change} value={this.state.course.materialsNeeded}/>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" onClick={this.submit}>Update Course</button>
                <button className="button button-secondary"  onClick={this.cancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
        </>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

export default UpdateCourse;
