const express = require('express');
const path = require('path');
const mongose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');

mongose.connect(config.database);

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

//* Express Session Middleware
app.use(session({
    secret: 'whataveryouputforsecureyoursession',
    resave: true,
    saveUninitialized: true,
}));

//* Express Messages Middleware
app.use(flash());
app.use(function (req, res, next) {
    // Assign all message from connect flash to res.locals.message
    res.locals.messages = require('express-messages')(req, res);
    next();
});


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

//* Get access to Route Files
let articles = require('./routes/articles');
let users = require('./routes/users');

app.use('/articles', articles);
app.use('/users', users);


//* Start Server
app.listen(3000, () => {
    console.log("Server started on port 3000");
})