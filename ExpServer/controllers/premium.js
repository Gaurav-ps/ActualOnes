const User = require('../models/users')
const Expense = require('../models/expenses')
const sequelize = require('../util/database')

const getUserLeaderBoard = async(req,res,next) => {
    try{
        const users = await User.findAll({
            attributes:['id','name']
    })
        const userExpenses = await Expense.findAll({
            attributes:['userId',[sequelize.fn('sum', sequelize.col('amount')),'total_cost']],
            group:['userId']
        })
        console.log(userExpenses)
        var userLeaderBoardDetails = []
        users.forEach((user) => {
            userLeaderBoardDetails.push({name: user.name, total_cost: userExpenses.total_cost || 0})
        })
        userLeaderBoardDetails.sort((a,b) => b.total_cost - a.total_cost)
        res.status(200).json(userLeaderBoardDetails)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = {
    getUserLeaderBoard,
}