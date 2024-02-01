const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

//get all books documents
router.get('/', booksController.getAll);

//get single book document by id
router.get('/:id', booksController.getSingle);

//Create a POST route to create a new book.
router.post('/', booksController.newBook);

//Create a PUT route to update a book
router.put('/:id', booksController.updateBook);

//Create a DELETE route to delete a book
router.delete('/:id', booksController.deleteBook);

//export the router
module.exports = router;