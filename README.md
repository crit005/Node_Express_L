# Bower

Bower is a package manager for the web

## Install Bower

``` 
    npm install -g bower
 ```

## Config folder

Create file name .bowerrc

``` json
{
    "directory": "public/bower_components"
}
```

## Install web pacage

``` 
bower install bootstrap
bower install jquery
```

# Add bootstrap and jquery to your pug page

``` pug
link(rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.css")

script(src='/bower_components/jquery/dist/jquery.min.js')
script(src='/bower_components/bootstrap/dist/js/bootstrap.min.js')
```

