const Expenses = require('../models/expenses')


const addExpense = async(req,res,next) => {
    try{
        const expenses = req.body.Expenses
        const description = req.body.Description
        const data = await Expenses.create({amount: expenses, description: description})
        res.status(201).json({expenseDetails: data})
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

const getExpense = async(req,res,next) => {
    try{
        const expenses = await Expenses.findAll();
        res.status(200).json({allExpenses: expenses})
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}

const deleteExpense = async(req,res,next) => {
    try{
        const uId = req.params.id;
        await Expenses.destroy({where: {id: uId}})
        res.sendStatus(200)
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
}

module.exports = {
    addExpense,
    getExpense,
    deleteExpense
}