const express = require('express');

const path = require('path')

const rooDir = require('../util/path')

const router = express.Router();

router.get('/add-product',(req, res, next) => {
    res.sendFile(path.join(rooDir,'views','add-product.html'))
})

router.post('/add-product',(req, res, next) => {
    console.log(req.body)
    res.redirect('/');
})

router.get('/contactus',(req,res,next) => {
    res.sendFile(path.join(rooDir,'views','contact.html'))
})

router.get('/success',(req,res,next) => {
    res.send('Form Successfully Filled!!')
})

module.exports = router;