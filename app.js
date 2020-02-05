const express = require('express');
const path = require('path');

//* Init App
const app = express();

//* Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//* Home rout
app.get('/', (req, res) => {
    let articles = [
        {
            id: 1,
            title: 'Article One',
            author: 'Konthea',
            body: 'This is article one'
        },
        {
            id: 2,
            title: 'Article Two',
            author: 'Konthea',
            body: 'This is article two'
        },
        {
            id: 3,
            title: 'Article three',
            author: 'Konthea',
            body: 'This is article three'
        },

    ];
    res.render('index', {
        title: 'Nodejs Express/Home',
        articles: articles

    });
});

//* Start Server
app.listen(3000, () => {
    console.log("Server started on port 3000");
})