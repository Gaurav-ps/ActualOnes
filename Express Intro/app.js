const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const path = require('path')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'Public')))

app.use('/admin',adminRoutes)
app.use(shopRoutes)

app.use((req,res,next) => {
    res.status(404).sendFile(path.join(__dirname,'views','error.html'))
})

app.listen(3000);
