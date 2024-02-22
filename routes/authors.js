const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const { requiresAuth } = require('express-openid-connect');

//get all contacts documents
router.get('/', authorsController.getAll);

//get single contact document by id
router.get('/:id', authorsController.getSingle);

//Create a POST route to create a new contact.
router.post('/', requiresAuth(), authorsController.newAuthor);

//Create a PUT route to update a contact
router.put('/:id', requiresAuth(), authorsController.updateAuthor);

//Create a DELETE route to delete a contact
router.delete('/:id', requiresAuth(), authorsController.deleteAuthor);

//export the router
module.exports = router;