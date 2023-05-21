const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./util/database')
const expenseRoutes = require('./routes/expense')
const orderRoutes = require('./routes/orders')
const userRoutes = require('./routes/users')

var cors = require('cors')
const app = express();

app.use(cors())

app.use(bodyParser.json({extended: false}))

app.use(expenseRoutes)

app.use(orderRoutes)

app.use('/users',userRoutes)

sequelize.sync().then((result)=> {
    app.listen(4000)
})
.catch(err => {
    console.log(err)
})

