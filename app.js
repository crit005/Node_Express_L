const express = require('express');
const path = require('path');
const mongose = require('mongoose');

mongose.connect('mongodb://localhost/nodekb');

let db = mongose.connection;

//* Check Connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

//* Check for DB error
db.on('error', (err) => {
    console.log(err);
});

//* Init App
const app = express();

//* Bring in Models
let Article = require('./models/articles');

//* Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//* Home rout
app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Nodejs Express/Home',
                articles: articles
            });
        }
    })
});

//* Start Server
app.listen(3000, () => {
    console.log("Server started on port 3000");
})