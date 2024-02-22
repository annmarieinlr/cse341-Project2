const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { requiresAuth } = require('express-openid-connect');

//get all books documents
router.get('/', booksController.getAll);

//get single book document by id
router.get('/:id', booksController.getSingle);

//Create a POST route to create a new book.
router.post('/', requiresAuth(), booksController.newBook);

//Create a PUT route to update a book
router.put('/:id', requiresAuth(), booksController.updateBook);

//Create a DELETE route to delete a book
router.delete('/:id', requiresAuth(), booksController.deleteBook);

//export the router
module.exports = router;