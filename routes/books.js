const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

//Handler function to wrap each route
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
      console.log('Async Handler error')
      res.render('error');
    }
  }
}


//Books table (GET)
router.get('/', asyncHandler(async (req, res) => {

}));

//Create book form
router.get('/new', (req, res) => {

});

//Create book (POST)
router.post('/new', asyncHandler(async (req, res) => {

}));


//Update book form
router.get("/:id", asyncHandler(async(req, res) => {

}));


//Update book
router.post('/:id', asyncHandler(async (req, res) => {

}));


//Remove book
router.post('/:id/delete', asyncHandler(async (req ,res) => {

}));

module.exports = router;