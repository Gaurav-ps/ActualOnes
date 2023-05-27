const Expenses = require('../models/expenses')
const User = require('../models/users')
const sequelize = require('../util/database')

const addExpense = async(req,res,next) => {
    try{
        const t = await sequelize.transaction();
        const expenses = req.body.Expenses
        const description = req.body.Description
        const category = req.body.Category
        const data = await Expenses.create({amount: expenses, description: description, category: category, userId: req.user.id},{transaction:t})
        const total_cost = Number(req.user.totalExpenses) + Number(expenses)
        console.log(total_cost)
        await User.update({
            totalExpenses: total_cost
        },{
            where: {id: req.user.id},
            transaction:t,
        })
        await t.commit()
        res.status(201).json({expenseDetails: data})
    }
    catch(err){
        console.log(err)
        await t.rollback()
        res.status(500).json({
            error: err
        })
    }
}

const getExpense = async(req,res,next) => {
    try{
        const expenses = await Expenses.findAll({where: {userId: req.user.id}});
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
        const t = await sequelize.transaction();
        const uId = req.params.id;
        const amount = req.body.amount
        console.log(req.data)
        const response = await Expenses.destroy({where: {id: uId, userId: req.user.id}},{transaction:t})
        const total_cost = Number(req.user.totalExpenses) - Number(amount)
        console.log(total_cost)
        await User.update({
            totalExpenses: total_cost
        },{
            where: {id: req.user.id},
            transaction:t,
        })
        await t.commit();
        if(response === 0){
            return res.status(404).json({success: false, message: 'Does not belong to user'})
        }
        return res.status(200).json({success:true, message:'Deleted Successfully!!'})
    }
    catch(err){
        await t.rollback();
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