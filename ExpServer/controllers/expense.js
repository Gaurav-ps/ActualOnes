const Expenses = require('../models/expenses')
const Users = require('../models/users')


const addExpense = async(req,res,next) => {
    try{
        const expenses = req.body.Expenses
        const description = req.body.Description
        const category = req.body.Category
        console.log(req.user)
        const data = await Expenses.create({amount: expenses, description: description, category: category, userId: req.user.id})
        console.log(data)
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
        const expenses = await Expenses.findAll({where: {userId: req.user.id}});
        //req.user.getExpenses()
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
        const response = await Expenses.destroy({where: {id: uId, userId: req.user.id}})
        if(response === 0){
            return res.status(404).json({success: false, message: 'Does not belong to user'})
        }
        
        return res.status(200).json({success:true, message:'Deleted Successfully!!'})
        
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