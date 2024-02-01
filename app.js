// import dependencies
const express = require('express');
const mongodb = require('./db/connect');

//set up server
const port = process.env.PORT || 8080;
const app = express();

//Parse json
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })

//Define routes  - this defaults to index file that should include all needed routes
app.use('/', require('./routes'));

//Initialize mongodb connection
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DataBase and listening on ${port}`);
  }
});
