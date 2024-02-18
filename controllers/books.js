//New code with error handling and validation...I hope

// Import the connection setup
const mongodb = require('../db/connect');

// Get the ObjectId class from the mongodb library
const { ObjectId } = require('mongodb');

/*
This function handles a request to get all documents from the 'books' collection.
It uses await to wait for the result of the MongoDB find() operation.
result.toArray() converts the result to an array of documents.
It sets the response headers to indicate JSON content and sends the JSON array as the response.
*/
const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db("Library").collection('books').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

/*
This function handles a request to get a single document from the 'books' collection based on the provided id parameter.
It creates an ObjectId using the req.params.id (assuming the ID is passed as a URL parameter).
It performs a MongoDB find() operation with the specified _id.
It sets the response headers and sends the first document from the result array as the JSON response.
*/
const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("Library").collection('books').find({ _id: userId });
    const lists = await result.toArray();
    if (lists.length === 0) {
      res.status(404).json({ error: "Book not found" });
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};


// Create new book

const newBook = async (req, res, next) => {
  
  try {
  // Validate book data
  if (!req.body.title || !req.body.authorFirstName || !req.body.authorLastName || !req.body.genre || !req.body.publisher || !req.body.series || !req.body.yearPublished) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
    const book = {
      title: req.body.title,
      authorFirstName: req.body.authorFirstName,
      authorLastName: req.body.authorLastName,
      genre: req.body.genre,
      publisher: req.body.publisher,
      series: req.body.series,
      yearPublished: req.body.yearPublished
    };

    

    // Get a response from the database
    const response = await mongodb.getDb().db('Library').collection('books').insertOne(book);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'There was an error creating this book.');
    }
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

// Update a book
const updateBook = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    // Validate book data
    if (!req.body.title || !req.body.authorFirstName || !req.body.authorLastName || !req.body.genre || !req.body.publisher || !req.body.series || !req.body.yearPublished) {
      res.status(400).json({message: "Missing required fields"});
      return;
    }
    const book = {
      title: req.body.title,
      authorFirstName: req.body.authorFirstName,
      authorLastName: req.body.authorLastName,
      genre: req.body.genre,
      publisher: req.body.publisher,
      series: req.body.series,
      yearPublished: req.body.yearPublished
    };

    

    const response = await mongodb.getDb().db('Library').collection('books').replaceOne({ _id: userId }, book);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

// Delete a book
const deleteBook = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('Library').collection('books').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};


// Export the functions
module.exports = { getAll, getSingle, newBook, updateBook, deleteBook};




//Code that was definitely working before I added the new stuff

// //import the connection set up
// const mongodb = require('../db/connect');

// //get the ObjectId class from the mongodb library
// const ObjectId = require('mongodb').ObjectId;

// /*
// This function handles a request to get all documents from the 'books' collection.
// It uses await to wait for the result of the MongoDB find() operation.
// result.toArray() converts the result to an array of documents.
// It sets the response headers to indicate JSON content and sends the JSON array as the response.
// */
// const getAll = async (req, res, next) => {
//   const result = await mongodb.getDb().db("Library").collection('books').find();
//   result.toArray().then((lists) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(lists);
//   });
// };

// /*
// This function handles a request to get a single document from the 'books' collection based on the provided id parameter.
// It creates an ObjectId using the req.params.id (assuming the ID is passed as a URL parameter).
// It performs a MongoDB find() operation with the specified _id.
// It sets the response headers and sends the first document from the result array as the JSON response.
// */
// const getSingle = async (req, res, next) => {
//   const userId = new ObjectId(req.params.id);
//   const result = await mongodb
//     .getDb()
//     .db("Library")
//     .collection('books')
//     .find({ _id: userId });
//   result.toArray().then((lists) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(lists[0]);
//   });
// };


// //Create new book

// const newBook = async (req, res) => {
//   const book = {
//     title: req.body.title,
//     authorFirstName: req.body.authorFirstName,
//     authorLastName: req.body.authorLastName,
//     genre: req.body.genre,
//     publisher: req.body.publisher,
//     series: req.body.series,
//     yearPublished: req.body.yearPublished
//   };

// //get a response from the database *note for me: 201 = ok and new resourse was created; 500=error
//   const response = await mongodb
//     .getDb()
//     .db('Library')
//     .collection('books')
//     .insertOne(book);
//   if (response.acknowledged) {
//     res.status(201).json(response);
//   } else {
//     res.status(500).json(response.error || 'There was an error creating this contact.');
//   }
// };

  

//   //Update a book
// const updateBook = async (req, res) => {
//   const userId = new ObjectId(req.params.id);
//   const book = {
//     title: req.body.title,
//     authorFirstName: req.body.authorFirstName,
//     authorLastName: req.body.authorLastName,
//     genre: req.body.genre,
//     publisher: req.body.publisher,
//     series: req.body.series,
//     yearPublished: req.body.yearPublished
//   };

//   const response = await mongodb
//     .getDb()
//     .db('Library')
//     .collection('books')
//     .replaceOne({ _id: userId }, contact);  
//   console.log(response);
//   if (response.modifiedCount > 0) {
//     res.status(204).send();
//   } else {
//     res.status(500).json(response.error || 'An error occurred updating this document.');
//   }
  
// };




// // Delete a book - Why would you do this??

// const deleteBook = async (req, res) => {
//   const userId = new ObjectId(req.params.id);
//   const response = await mongodb.getDb()
//     .db('Library')
//     .collection('books')
//     .deleteOne({ _id: userId });
//   console.log(response);
//   if (response.deletedCount > 0) {
//     res.status(204).send();
//   } else {
//     res.status(500).json(response.error || 'An error occurred deleting this contact.');
//   }
// };


// //export the functions
// module.exports = { getAll, getSingle, newBook, updateBook, deleteBook};  