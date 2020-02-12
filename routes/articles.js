const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

//* Bring in Models
let Article = require('../models/articles');

// * load edit form
router.get('/edit/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('edit_article', { article: article });
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

    let query = { _id: req.params.id }

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
    let query = { _id: req.params.id }

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
        res.render('article', { article: article });
    });
});

//* Export module
module.exports = router;