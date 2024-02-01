//import dotenv and mongoClient
const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

//Declare a global variable to store the MongoDB client instance
let _db;

//Initialize database connection
/*
This checks if there is already a connection. If not, then itwill establish one. If it can't it will catch the error and send it to a callback.
*/
const initDb = (callback) => {
    if (_db) {
      console.log('The Database is already initialized!');
      return callback(null, _db);
    }
    MongoClient.connect(process.env.MONGODB_URI)
      .then((client) => {
        _db = client;
        callback(null, _db);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
//Get Database Instance
/*
If it does not exist it throws and error.
If it does exist, it returns the client instance.
*/
const getDb = () => {
    if (!_db) {
      throw Error('Db not initialized');
    }
    return _db;
  };
   
  //Exports
  module.exports = {
    initDb,
    getDb,
  };
  