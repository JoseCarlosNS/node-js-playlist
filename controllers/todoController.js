// Imports
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb+srv://root:Senha123@starting-mongo-hc3lq.gcp.mongodb.net/todo-app?retryWrites=true', {
    useNewUrlParser: true
});

console.log('Connected to MongoDB cluster');

// Create a schema - blueprint for data
var todoSchema = new mongoose.Schema({
    item: String
});

// Create todo model
var Todo = mongoose.model('Todo', todoSchema);

// Set type of body parser, in that case, encoded into URL
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

module.exports = function (app) {

    app.get('/todo',
        (req, res) => {

            // Get data from mongodb and pass to view
            Todo.find({}, (err, data) => {

                if (err) throw err;

                res.render('todo', {
                    items: data
                });
            });
        });

    app.post('/todo', urlencodedParser,
        (req, res) => {

            // Get data from the view and pass to MongoDB
            var newTodo = Todo(req.body).save((err, data) => {

                if (err) throw err;

                res.json(data);
                console.log('Item Saved!');
            });
        });

    app.delete('/todo/:item',
        (req, res) => {

            // Delete the requested item from MongoDB
            Todo.find({
                item: req.params.item.replace(/\-/g, ' ')
            }).deleteOne((err, data) => {

                if (err) throw err;

                res.json(data);
                console.log('Item deleted!');
            });
        });
};