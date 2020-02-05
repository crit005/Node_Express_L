const express = require('express');

//* Asigne param express
const app = express();

//* Express rout
app.get('/',(req, res)=>{
    res.send('Hello world');
});

//* Create server son specific port 3000
app.listen(3000,()=>{
    console.log("Server started on port 3000");
})