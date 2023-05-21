const Users = require('../models/users')

const addUsers = async(req,res,next) => {
    try{
        console.log(req.body)
        const name = req.body.Name
        const email = req.body.Email
        const password = req.body.Password
        const data = await Users.create({name: name, email: email, password: password})
        res.status(201).json({userDetails: data})
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

const getUsers = async(req,res,next) => {
    try{
        const allUsers = await Users.findAll()
        res.status(200).json({existingUsers: allUsers})
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {
    addUsers,
    getUsers
}