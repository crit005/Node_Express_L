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
app.use(bodyParser.urlencoded({extended:false}));
//* parse applicaton/json
app.use(bodyParser.json());

//* Home rout
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

app.get('/articles/add',(req,res)=>{
    res.render('add_article',{
        title:'Add Article'
    });
});

app.post('/articles/add',(req,res)=>{
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    article.save((err)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.redirect('/');
        }
    })
});

//* Start Server
app.listen(3000, () => {
    console.log("Server started on port 3000");
})