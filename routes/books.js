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
  const books = await Book.findAll();
  res.render("index", {books});
}));

//Create book form
router.get('/new', (req, res) => {
  res.render("new-book");
});

//Create book (POST)
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    console.log(req.body)
    res.redirect("/books/" + book.id);
  } catch (error) {
     if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
       res.render("new-book", { book, errors: error.errors})
     } else {
       throw error;
     }  
  }
}));


//Update book form
router.get("/:id", asyncHandler(async(req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("update-book", { book });      
   } else {
     res.render('error');
   }
}));


//Update book
router.post('/:id', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body);
      res.redirect('/books/' + book.id); 
    } else {
      res.sendStatus(404).render('error');
    }
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render("update-book", { book, errors: error.errors})
    } else {
      throw error;
    }
  }
}));


//Remove book
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/books");
  } else {
    res.sendStatus(404).render('page-not-found');
  }
}));

module.exports = router;