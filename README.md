npm install express-messages express-session connect-flash express-validator --save
npm install express-validator

> https://github.com/visionmedia/express-messages
> https://www.npmjs.com/package/connect-flash

# Separate Routing

Instead of  put all the routes in a single app.js, we can make it separate to individual route for easy manage your code later.

Create a directory name routes in your project directory and add your route file in it ex: articles.js.

To use this file as route file we need Router() method form express module

``` js
const express = requite('express');
const router = express.Router();
```

And to allow app.js use use this file as route we need to export this rout module at the end of file.

``` js
module.exports = router;
```

This is same ple all content of articles.js

``` js
const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');

//* Bring in Models
let Article = require('../models/articles');

// * load edit form
router.get('/edit/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('edit_article', {
            article: article
        });
    });
});

router.get('/add', (req, res) => {
    res.render('add_article', {
        title: 'Add Article'
    });
});

//* add article to db
router.post('/add', [
    check('title', 'Title is required').notEmpty(),
    check('author', 'Author is required').notEmpty(),
    check('body', 'Body is required').notEmpty(),
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('add_article', {
            title: 'Add Article',
            errors: errors.array()
        });
    } else {
        let article = new Article();
        article.title = req.body.title;
        article.author = req.body.author;
        article.body = req.body.body;
        article.save((err) => {
            if (err) {
                console.log(err);
                return;
            } else {
                req.flash('success', 'Article Added');
                res.redirect('/');
            }
        })
    }

});

//* edit article to db
router.post('/edit/:id', (req, res) => {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {
        _id: req.params.id
    }

    Article.update(query, article, (err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            req.flash('success', 'Article Updated');
            res.redirect('/');
        }
    })
});

//* delete article by id
router.delete('/:id', (req, res) => {
    let query = {
        _id: req.params.id
    }

    Article.remove(query, (err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.send('Success');
        }
    })
});

//* load article by id
router.get('/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('article', {
            article: article
        });
    });
});

//* Export module
module.exports = router;
```

## Using articles rout in app.js

To use individuale route file in app.js we can bring it in side as below:

``` js
//* Get access to Route Files
let articles = require('./routes/articles');
app.use('/articles', articles);
```

# Messaging and Validator

Using Messageing and Validator for express we required a few module from npm repository

* express-session
* connect-flash
* express-messages
* express-validator

Let install all of them

``` 
npm install --save express-session connect-flash express-messages express-validator
```

## Set Require module and Middleware

Bring in express-session module justo install about and setup Middleware for messaging in to app.js

``` js
//* Require module
const session = require('express-session');

//* Express Session Middleware
app.use(session({
    secret: 'whataveryouputforsecureyoursession',
    resave: true,
    saveUninitialized: true,
}));

//* Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next) {
    // Assign all message from connect flash to res.locals.message
    res.locals.messages = require('express-messages')(req, res);
    next();
});
```

## Make a message template

Create Message template in views directory name message.pug and put sample as below:

``` pug
.messages
    each type in Object.keys(messages)
        each message in messages[type]
            // Create div message depend on type of message
            div(class='alert alert-'+type) #{message}
```

## Embed message template in layout template file

Edeit your layout.pug and put the code below:

``` pug
// embed message template if the messages are avaliable
!= messages('message', locals)
```

## Set a message

Syntax: req.flash('type', 'message'); 

* type: It is a pees of your class style fory your message if with bootstrap it can be ('success', 'info' or 'danger' ... ).
* message: It is a informaton that you want to publish.

Let see how we set a meesgae after article was added:

``` js
//* add article to db
router.post('/add', [
    check('title', 'Title is required').notEmpty(),
    check('author', 'Author is required').notEmpty(),
    check('body', 'Body is required').notEmpty(),
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('add_article', {
            title: 'Add Article',
            errors: errors.array()
        });
    } else {
        let article = new Article();
        article.title = req.body.title;
        article.author = req.body.author;
        article.body = req.body.body;
        article.save((err) => {
            if (err) {
                console.log(err);
                return;
            } else {
                req.flash('success', 'Article Added');
                res.redirect('/');
            }
        })
    }
});
```

