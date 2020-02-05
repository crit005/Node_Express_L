# Pug Template Engin
Pug is a Template engine to make easy code with html document.

## Installation pug

npm install --save pug

## VSCODE formarter

* Install extention name pug (jade) formatter.it allow you to use Alt + Shift + F to formate pug code.

## Set Default Express View Engine

``` 
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```

## Render in route

``` 
//* Home rout
app.get('/',(req, res)=>{
    res.render('index');
});
```

## Template Layout

Create your layout.pug and write content pug as nomal for static content, but for Dinamic content you must use block blockname.

``` pug
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport" content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible" content="ie=edge")
        title #{title}
    body
        block content
        br
        hr
        fotter
            p Copyright &copy; 2020
```

## Parssing Paramete to Render View

``` 
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
```

## Catching Paramete in pug

You can use #{param_name} to get value form paramete.

In loop you can use = param_name insteat.

``` 
h1 #{title}
    ul
        // loop into param
        each article, i in articles 
            li= article.title
            li= article.author
            li= article.body
            hr
```

