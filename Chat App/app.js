const http = require('http');

const express = require('express');

const fs = require('fs');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res,next) => {
    fs.readFile('chats.txt',(err,data) => {
        if(err){
            data = 'No chats exists'
            console.log(err);
        }
        res.send(`${data}<form action = "/" method="POST" onSubmit="document.getElementById('username').value = localStorage.getItem('username')">
        <input id = "message" type="text" name="message">
        <input type = "hidden" id="username" name="username">
        <button type="submit">Send</button></form>`)
    })
})

app.post('/',(req,res,next) => {
    console.log(req.body.username);
    console.log(req.body.message);
    console.log(`${req.body.username}:${req.body.message}`)
    fs.writeFile("chats.txt",`${req.body.username}:${req.body.message}`,{flag:'a'},(err) => {
        if(err) console.log(err);
        else res.redirect('/')
    })
})

app.get('/login',(req, res, next) => {
    res.send(`<form action = "/login" onSubmit = localStorage.setItem("username",document.getElementById("username").value) action="/message" method="POST">
    <input id = "username" type="text" name="username">
    <button type="submit">Login</button></form>`)
})

app.post('/login',(req,res,next) => {
    console.log(req.body.username);
    res.redirect('/');
})

app.use((req,res,next) => {
    res.status(404).send('<h1>Page Not Found</h1>')
})

app.listen(3000);
