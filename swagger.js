const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Library api'
  },
  host: 'libraryrender.onrender.com',
  schemes:['https']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/swagger.js', './routes/books.js', './routes/index.js', './routes/authors.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */  //ask Josh about this!

swaggerAutogen(outputFile, routes, doc);