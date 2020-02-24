npm install passport passport-local bcryptjs
validator doc https://morioh.com/p/f559e6886d18

Make a new folder name config and create file name passport.js int to put Local Stategy in it.

Open passort.js and put the code as below: 

``` js
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    // Local Username, Setup Local Strategy
    passport.use(new LocalStrategy((username, password, done) => {
        // Find User by username
        let query = {
            username: username
        };
        User.findOne(query, (err, user) => {
            if (err) throw err;
            // Not match condition
            if (!user) {
                return done(null, false, {
                    message: 'Nouser found'
                });
            }
            // Match Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Wrong password'
                    });
                }
            })
        })
    }));

    // Passprt serializeUser
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

}
```

Now tell the app to use passport

    Import pasport in app.js

``` js
const passport = require('')

//* Passport Config
require('./config/passport')(passport);
// Passport Midleware
app.use(passport.initialize());
app.use(passport.session());

// Set public variable for themplat engin access user form any where
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
})
```

Working with passport in users.js router

``` js
const passport = require('passport');
//* Login 
router.get('/login', (req, res) => {
    res.render('login');
});

//* Login process
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//* Loout process
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out')
    res.redirect('/users/login');
});
```

# Access controller

To protect you route form user accerss without login and redirect them to somewhere you want, we can function to ensur authenticat  for each rout as below:

``` js
// Access Control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}
```

Embet this functon to all route which you want to protect

``` js
//* delete article by id
router.delete('/:id', ensureAuthenticated, (req, res) => {

    if (!req.user._id) {
        res.status(500).send();
    }

    let query = { _id: req.params.id }

    Article.findById(req.params.id, (err, article) => {
        if (article.author != req.user._id) {
            res.status(500).send();
        } else {
            Article.remove(query, (err) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.send('Success');
                }
            });
        }
    })


});
```
