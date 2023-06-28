const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function stringValidate(string){
    if(string === undefined || string.length === 0){
        return true;
    }
    else{
        return false;
    }
}

const addUsers = async(req,res,next) => {
    try{
        const name = req.body.Name
        const email = req.body.Email
        const phoneNumber = req.body.Phone
        const password = req.body.Password 

        if(stringValidate(name) || stringValidate(email) || stringValidate(password)){
            return res.status(400).json({err: 'Bad Parameters'})
        }
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds,async(err,hash)=>{
            await User.create({name:name, email:email, phoneNumber: phoneNumber, password:hash})
            res.status(201).json({message: 'User created successfully'})
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

function generateAccessToken(id){
    return jwt.sign({userId: id},'secretkey')
}



module.exports = {
    addUsers,
    //loginUsers,
    generateAccessToken,
}