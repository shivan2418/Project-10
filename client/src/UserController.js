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

    // This returns 401 as error 
    return fetch(url, options);
  }
  

  async deleteCourse(path,username,password){
    console.log(`Passing username ${username} password ${password}`)

    const response = await this.call_api(path,"DELETE",null,true,{username:username,password:password});
    console.log(response);
    return response.status;
  }

  async getUser(username, password) {
    console.log(`calling getuser ${username} password ${password}`);
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