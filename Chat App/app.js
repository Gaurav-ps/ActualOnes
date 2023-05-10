const http = require('http');

const express = require('express');

const fs = require('fs');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.get('/login',(req, res, next) => {
    console.log('In the middleware!!')
    res.send(`<form action = "/" onsubmit = localStorage.setItem("username",document.getElementById("username").value) action="/message" method="POST">
    <input id = "username" type="text" name="username">
    <button type="submit">Login</button></form>`)
})

app.post('/message',(req, res, next) => {
    console.log('In the next middleware!!')
    res.redirect('/')
})

app.get('/',(req,res,next) => {
    console.log(req.body);
    res.send(`<form action = "/" onsubmit = "document.getElementById("username") = localStorage.getItem("username")" method = "POST" >
    <input id = "message" type="text" name="message">
    <input id="username" name="username">
    <button type="submit">Send</button></form>`)
})

app.post('/',(req,res,next) => {
    console.log(`${req.username}:${req.message}`)
    res.redirect('/')
})

app.use((req,res,next) => {
    res.status(404).send('<h1>Page Not Found</h1>')
})

app.listen(3000);
