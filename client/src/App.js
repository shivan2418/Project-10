import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';
import Error from './components/Error';
import withContext from './AuthContext'
import PrivateRoute from './PrivateRoute';

const HeaderWithAuth = withContext(Header);
const CoursesWithAuth = withContext(Courses);
const CourseDetailWithAuth = withContext(CourseDetail);
const UpdateCourseWithAuth = withContext(UpdateCourse);
const CreateCourseWithAuth = withContext(CreateCourse);

const SignInWithAuth = withContext(UserSignIn);
const SignUpWithAuth = withContext(UserSignUp);
const SignOutWithAuth = withContext(UserSignOut);
const AuthenticatedWithAuth = withContext(Authenticated);


function App() {

  return (
    <Router>
      <div>
        <HeaderWithAuth/>

          <Switch>            
            <Route exact path ='/' component={CoursesWithAuth} />
            <PrivateRoute exact path = '/courses/create' component={CreateCourseWithAuth}/>
            <Route exact path = '/courses/:id' component={CourseDetailWithAuth}/>
            <Route exact path = '/signin' component={SignInWithAuth}/>
            <PrivateRoute exact path = '/courses/:id/update' component={UpdateCourseWithAuth}/>
            <Route exact path = '/signup' component={SignUpWithAuth}/>
            <Route exact path ='/error' component={Error}/>
            <Route exact path = '/signout' component={SignOutWithAuth}/>
            <PrivateRoute exact path = '/authenticated' component={AuthenticatedWithAuth}/>
          </Switch>
    </div>
      </Router>
  );
}

export default App;
