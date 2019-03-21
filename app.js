// Imports
var express = require('express');
var todoController = require('./controllers/todoController');

// Set up express
var app = express();

// Set up template engine
app.set('view engine', 'ejs');

// Mapping any static files to the public folder
app.use(express.static('./public'));

// Fire controllers
todoController(app);

// Configure server to listen to port 3000
app.listen(3000);
console.log('Listening to port 3000...');

