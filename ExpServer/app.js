const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./util/database')
const expenseRoutes = require('./routes/expense')

var cors = require('cors')
const app = express();

app.use(cors())

app.use(bodyParser.json({extended: false}))

app.use(expenseRoutes)

sequelize.sync().then((result)=> {
    app.listen(4000)
})
.catch(err => {
    console.log(err)
})

