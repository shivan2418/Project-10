import config  from './config.js'

class UserController {

  call_api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      
      
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {   
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
      console.log(encodedCredentials);
    }
    console.log(`Calling ${url} with ${JSON.stringify(options)} `)

    return fetch(url, options);
  }
  
  async getCourse(courseId){
    return this.call_api(`/courses/${courseId}`,'GET');
  }

  async getCourses(){
    // Returns the list of courses 
    const response = await this.call_api(`/courses`,'GET');

    if (response.status===200) {
      return response.json();
    } 
    else {
      throw new Error();
    }
  }

  async updateCourse(course,username,password){
    let courseId = course.id;
    const response = await this.call_api(`/courses/${courseId}`,'PUT',course,true,{username,password})
    if (response.status===204){
      console.log(`Course ${courseId} updated successfully`);
      // Return an empty array of errors to show success
      return {errors:[]}
    } else if (response.status ===400){
      return response.json().then(data => data.errors);
    } else{
      throw Error;
    }
  }

  async deleteCourse(path,username,password){
    // Deletes the course and returns the status code 
    const response = await this.call_api(path,"DELETE",null,true,{username,password});
    return response.status;
  }

  async getUser(username, password) {
    const response = await this.call_api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      console.log("Could not get user");
      return null;
    }
    else {
      throw new Error();
    }
  }

  async createUser(user){
    const response = await this.call_api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
  }


export default UserController