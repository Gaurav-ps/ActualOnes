const http = require('http');

const express = require('express');

const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.use('/add-product',(req, res, next) => {
    console.log('In the next middleware!!');
    res.send('<form action="/product" method="POST"><input type="text" name="title"><input type="text" name="size"><button type="submit">Add Product</button></form>')
})

app.use('/product',(req, res, next) => {
    console.log(req.body)
    res.redirect('/');
})

app.use((req, res, next) => {
    console.log('In the next middleware!!');
    res.send('<h1>Welcome to Express!!</h1>')
})

app.listen(3000);
