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

## Init you bower package 

You may not want to commit all your bower pacackges to server, so you can create bower.json to stor pacage name by run command below:

``` 
bower init
```

# Add bootstrap and jquery to your pug page

``` pug
link(rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.css")

script(src='/bower_components/jquery/dist/jquery.min.js')
script(src='/bower_components/bootstrap/dist/js/bootstrap.min.js')
```

