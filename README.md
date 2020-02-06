# Mongoose and Model Setup

## Mongo Command

``` 
show dbs // Show all databases
use db_name // create database and switch to database
db.createCollection('Collection_name') // Create Collection
db.collection_name.insert({title:'your title', author: 'author name', body:'your body'}) // Insert to Collection
db.collection_name.find().pretty() // Read and search in collection
```

## Mongoosejs

Install repository

``` 
$ npm install mongoose
```

## Usage 

### Create model

Create Model file (ex: models/articles.js)

``` js
let mongoose = require('mongoose');

//* Article Schema
let articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

//*Expot as model
let Article = module.exports = mongoose.model('Article', articleSchema);
```

