# Upate Article

## Add a link to for access Edit page in article.pug

``` pug
extends layout

block content
    h1= article.title
    h5 Written by #{article.author}
    p= article.body
    hr
    a.btn.btn-default(href="/article/edit/"+article._id) Edit
```

## Create Edit page in Views directory name edit_article.pug

``` pug
extends layout

block content
    h1 #{title}
    form(method='POST' action='/articles/edit/' + article._id)
        #form-group
            label Title:
            input.form-control(type="text" name='title', value= article.title)
        #form-group
            label Author:
            input.form-control(type="text" name='author',value= article.author)
        #form-group
            label Body:
            textarea.form-control(name='body')=article.body
        input.btn.btn-primary(type='submit' value='Submit')
```

## Create rout for load edit form in app.js

``` js
// * load edit form
app.get('/article/edit/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('edit_article', {
            article: article
        });
    });
});
```

## create rout for update and return to home in app.js

``` js
//* edit article to db
app.post('/articles/edit/:id', (req, res) => {
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
            res.redirect('/');
        }
    })
});
```

# Delete Article

## Add a link to for access Edit page in article.pug

``` pug
extends layout

block content
    h1= article.title
    h5 Written by #{article.author}
    p= article.body
    hr
    a.btn.btn-default(href="/article/edit/"+article._id) Edit
    a.btn.btn-danger.delete-article(href="#", data-id=article._id) Delete
```

## Create main.js in public/js to handle delete even with Ajax of Delete type

``` js
$(document).ready(() => {
    $('.delete-article').on('click', (e) => {
        $taget = $(e.target);
        const id = $taget.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: `/article/${id}` ,
            success: (res) => {
                alert( `Delete Article` );
                window.location.href = `/` ;
            },
            error: (err) => {
                console.log(err);
            }
        })
    })
});
```

## Include main.js to layout.pug

``` pug
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport" content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible" content="ie=edge")
        title #{title}
        link(rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.css")
        link(rel="stylesheet" href="/css/style.css")
    body

        nav.navbar.navbar-expand-md.navbar-dark.bg-dark
            .container
                a.navbar-brand(href='#') Project name
                button.navbar-toggler(type='button' data-toggle='collapse' data-target='#navbarsExampleDefault' aria-controls='navbarsExampleDefault' aria-expanded='false' aria-label='Toggle navigation')
                    span.navbar-toggler-icon
                #navbarsExampleDefault.collapse.navbar-collapse
                    ul.navbar-nav.mr-auto
                        li.nav-item.active
                            a.nav-link(href='/') Home                            
                        li.nav-item
                            a.nav-link(href='/articles/add') Add Article                    
                    form.form-inline.my-2.my-lg-0
                        input.form-control.mr-sm-2(type='text' placeholder='Search' aria-label='Search')
                        button.btn.btn-secondary.my-2.my-sm-0(type='submit') Search

        .container
            block content
            br
            hr
            fotter
                p Copyright &copy; 2020
    script(src='/bower_components/jquery/dist/jquery.min.js')
    script(src='/bower_components/bootstrap/dist/js/bootstrap.min.js')
    script(src='/js/main.js')
```

## Create rout for Delete method in app.js

``` js
//* delete article by id
app.delete('/article/:id', (req, res) => {
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
```

