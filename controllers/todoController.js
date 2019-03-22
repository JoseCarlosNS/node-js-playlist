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
var itemOne = Todo({
    item: 'First Item!'
}).save((err) => {

    if (err)
        console.log(err);

    console.log('Item saved!');
});

var data = [{
    item: 'get milk'
}, {
    item: 'walk dog'
}, {
    item: 'kick ass'
}];
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

module.exports = function (app) {

    app.get('/todo',
        (req, res) => {

            res.render('todo', {
                items: data
            });
        });

    app.post('/todo', urlencodedParser,
        (req, res) => {

            data.push(req.body);
            res.json(data);
        });

    app.delete('/todo/:item',
        (req, res) => {

            data = data.filter((todo) => {
                return todo.item.replace(/ /g, '-') !== req.params.item;
            })

            res.json(data);
        });
};