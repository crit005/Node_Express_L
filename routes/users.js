const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


//* Bring in User Model
let User = require('../models/user');

//* Register Form
router.get('/register', (req, res) => {

    res.render('register');
})

//* Register Proccess
router.post('/register', [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    check('password2', 'Confirm Password is required').notEmpty(),
    check('password2', 'Passwords do not match').custom((value, { req }) => (value === req.body.password))

], (req, res) => {
    data = req.body;
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('register', {
            formData: data,
            errors: errors.array()
        });
    } else {
        let newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.username = req.body.username;
        newUser.password = req.body.password;

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                newUser.password = hash;
                newUser.save((err) => {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        req.flash('success', 'Article Added');
                        res.redirect('/users/login');
                    }
                });
            });
        });

    }
});

//* Login 
router.get('/login',(req,res)=>{
    res.render('login');
});

module.exports = router;