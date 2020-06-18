var express = require('express');
var router = express.Router();

// Async handler wrapper
function asyncHandler(cb){
  return async(req,res,next) => {
    try{
      await cb(req,res,next)
    } catch(error){
      console.log(error);
      res.status(500).send(error);
    }
  }
}


// setup a friendly greeting for the root route
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

module.exports = router;
