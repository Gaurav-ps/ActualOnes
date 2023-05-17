const express = require('express')

const expenseRoutes = require('../controllers/expense')

const router = express.Router();

router.post('/add-expenses', expenseRoutes.addExpense)

router.get('/get-expenses', expenseRoutes.getExpense)

router.delete('/delete-expenses/:id', expenseRoutes.deleteExpense)

module.exports = router;