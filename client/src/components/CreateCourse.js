import React, { Component } from 'react'

class CreateCourse extends Component{

  constructor(props){
    super(props);
    this.state = {
      title:"",
      description:"",
      estimatedTime:"",
      materialsNeeded:"",
      errors:[]
    }
  }

  submit = (e) => {
      e.preventDefault();
      
  }

  cancel = () => {
    this.props.history.push('/')
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
  
    this.setState( () => {
      return {
        [name]:value
      };
    });
  }


  render(){
    var errors =''
    if (this.state.errors.length){
      errors = 
      <div>
      <h2 className="validation--errors--label">Validation errors</h2>
      <ul className='validation-errors'>
        {this.state.errors.map( (item,index) => <li key={index}>{item}</li> )}
      </ul>
      </div>
    }


    return(
        <div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
            <div className='errors'>
                {errors}
            </div>
          </div>
          <form>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={this.state.title} onChange={this.change}/></div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.change} value={this.state.description}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={this.state.estimatedTime} onChange={this.change}/></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.materialsNeeded} onChange={this.change}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button>
            <button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
          </form>
          </div>
          
    );
  }




}


export default CreateCourse;