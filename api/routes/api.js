var express = require("express");
var router = express.Router();
var User = require("../models").User;
var Course = require("../models").Course;
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
var cors = require('cors')



// Async handler wrapper
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}



// MIDDLEWARE

const  courseValidator = (req,res,next) => {
  [check('title')
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage('Please provide a value for "title"')
  ,
  check('description')
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage('Please provide a value for "description"')
  ];
  next();
}

const authenticateUser = async(req, res, next) => {
  let error_message = null;

  
  // Get the user's credentials from the Authorization header.
  const credentials = auth(req);

  if (credentials) {
    // Look for a user whose `username` matches the credentials `name` property.
    const user = await User.findOne({where: {emailAddress:credentials.name}});

    if (user) {
      const authenticated = bcryptjs
        .compareSync(credentials.pass, user.password);
      if (authenticated) {
        console.log(`Authentication successful for username: ${user.emailAddress}`);

        // Store the user on the Request object.
        req.currentUser = user;
      } else {
        error_message = `Authentication failure for username: ${user.emailAddress}`;
      }
      
    } else {
      error_message = `User not found for username: ${credentials.name}`;
    }
    
  } else {
    error_message = 'Auth header not found';
  }
  
  if (error_message) {
    res.status(401).json({ message: 'This endpoint requires authorization to access' });
  } else {
    next();
  }


}

// USERS

// Returns the currently authenticated user
router.get("/users",authenticateUser, asyncHandler(async (req, res) => {
    const currentUser = req.currentUser;
    let user = await User.findByPk(currentUser.id);
    res.status(200).json(user.toJSON());
  })
);

// Creates a user, sets the Location header to "/", and returns no content
router.post('/users',[check('firstName').exists({ checkNull: true, checkFalsy: true }).withMessage('Please provide a value for "firstName"'),
check('lastName').exists({ checkNull: true, checkFalsy: true }).withMessage('Please provide a value for "lastName"'),
check('emailAddress').exists({ checkNull: true, checkFalsy: true }).withMessage('Please provide a value for "emailAddress"'),
check('password').exists({ checkNull: true, checkFalsy: true })
.withMessage('Please provide a value for "password"')
],  asyncHandler(async (req, res) => {

       // check that have the required fields and that they are not empty
       const errors = validationResult(req);

       // Log out the error and end the chain
       if (!errors.isEmpty()){
         res.status(400).json({errors:errors.errors.map(e =>e.msg)}).end();
       }

      
    // Hash the password
    req.body.password = bcryptjs.hashSync(req.body.password);

    try{
    let newUser = await User.create(req.body);
    res.location('/');
    res.status(201).end()
    }catch(error){
      if (error.name==="SequelizeUniqueConstraintError"){
        error.message = 'The email already exists';
        res.status(400).json({"error":error.message});
      }
    }
  
  
  }));

// COURSES

// Returns a list of courses (including the user that owns each course)
router.get(
  "/courses",
  asyncHandler(async (req, res) => {
      let courses = await Course.findAll({
        include: [{ model: User }],
      });
      courses = courses.map((c) => c.toJSON());
      res.json(courses); }));

// Returns a the course (including the user that owns the course) for the provided course ID
router.get(
  "/courses/:id",
  asyncHandler(async (req, res) => {
    let course = await Course.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    if (!course) {
      res.status(404).json({ error_message: "No such course" });
    } else {
      
      res.json(course);
    }
  })
);


// Creates a course, sets the Location header to the URI for the course, and returns no content
router.post("/courses",[check('title')
.exists({ checkNull: true, checkFalsy: true })
.withMessage('Please provide a value for "title"')
,
check('description')
.exists({ checkNull: true, checkFalsy: true })
.withMessage('Please provide a value for "description"')
],authenticateUser, asyncHandler(async (req, res) => {
    

       // check that have the required fields and that they are not empty
       const errors = validationResult(req);

       // Log out the error and end the chain
       if (!errors.isEmpty()){
         res.status(400).json({errors:errors.errors.map(e =>e.msg)}).end();
       }
   
  
  try{
      req.body.userId = req.currentUser.id;

      let course = await Course.create(req.body);
      res.location(`/courses/${course.id}`);
      res.status(201).end();

    }catch(error){
        // checking the error
        next(error); //pass to the error handler
        //errs = error.errors.map((err) => err.error_message);
        //res.status(400).json({errors:errs}).end();
        
    }
  })
);


// Updates a course and returns no content
router.put("/courses/:id",[check('title')
.exists({ checkNull: true, checkFalsy: true })
.withMessage('Please provide a value for "title"')
,
check('description')
.exists({ checkNull: true, checkFalsy: true })
.withMessage('Please provide a value for "description"')
],authenticateUser, asyncHandler(async (req, res) => {

      // check that have the required fields and that they are not empty
    const errors = validationResult(req);

    // Log out the error and end the chain
    if (!errors.isEmpty()){
      res.status(400).json({errors:errors.errors.map(e =>e.msg)}).end();
    }


    let course = await Course.findByPk(req.params.id);
    try{
      await course.update(req.body);
      res.status(204).end();
    }catch(error){
      if (error.name === "SequelizeValidationError") {
        error.status(400);
      }
      next();
    }
  })
);

// Deletes a course and returns no content
router.delete("/courses/:id",authenticateUser, asyncHandler(async (req, res) => {
    console.log('Entered delete course')  ;
  res.addHeader("Access-Control-Allow-Origin", "*");

    let course = await Course.findByPk(req.params.id);
    await course.destroy();
    res.status(204).end();
  })
);


module.exports = router;
