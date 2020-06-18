import React from 'react';
import Header from './Components/Header'
import withContext from './AuthContext'
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Courses from './Components/Courses';
import CourseDetail from "./Components/CourseDetail";
import CreateCourse from "./Components/CreateCourse";
import UpDateCourse from "./Components/UpdateCourse";
import SignIn from './Components/UserSignIn';
import SignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import Authenticated from './Components/Authenticated';
import PrivateRoute from './PrivateRoute';

const HeaderWithAuth = withContext(Header);
const CoursesWithAuth = withContext(Courses);
const CourseDetailWithAuth = withContext(CourseDetail);
const CreateCourseWithAuth = withContext(CreateCourse);
const UpdateCourseWithAuth = withContext(UpDateCourse);
const SignInWithAuth = withContext(SignIn);
const SignUpWithAuth = withContext(SignUp);
const SignOutWithAuth = withContext(UserSignOut);
const AuthenticatedWithAuth = withContext(Authenticated);


function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderWithAuth/>
          <Switch>
            <Route exact path ='/' component={CoursesWithAuth} />
            <PrivateRoute exact path = '/courses/create' component={CreateCourseWithAuth}/>
            <PrivateRoute exact path = '/courses/:id/update' component = {UpdateCourseWithAuth}/>
            <Route exact path = '/courses/:id' component={CourseDetailWithAuth}/>
            <Route exact path = '/signin' component={SignInWithAuth}/>
            <Route exact path = '/signup' component={SignUpWithAuth}/>
            <PrivateRoute exact path = '/authenticated' component={AuthenticatedWithAuth}/>
            <Route exact path = '/signout' component={SignOutWithAuth}/>
          </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
