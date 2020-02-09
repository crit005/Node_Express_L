const express = require('express');
const path = require('path');
const mongose = require('mongoose');
const bodyParser = require('body-parser');

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

//* Body Parser Middleware
//* parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//* parse applicaton/json
app.use(bodyParser.json());

//* Set Static folder public
app.use(express.static(path.join(__dirname, 'public')));

//* Home routl
app.get('/', (req, res) => {
    //* Get all data from Articl
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

//* load article by id
app.get('/article/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('article', { article: article });
    });
});

// * load edit form
app.get('/article/edit/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('edit_article', { article: article });
    });
});

app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: 'Add Article'
    });
});

//* add article to db
app.post('/articles/add', (req, res) => {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    article.save((err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    })
});

//* edit article to db
app.post('/articles/edit/:id', (req, res) => {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id}
    
    Article.update(query, article, (err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    })
});

//* delete article by id
app.delete('/article/:id', (req, res) => {
    let query = {_id:req.params.id}
    
    Article.remove(query, (err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.send('Success');
        }
    })
});

//* Start Server
app.listen(3000, () => {
    console.log("Server started on port 3000");
})