const User = require('../models/users')

const forgotPassword = async(req,res,next) => {
    try{
        const email = req.body.email;
        console.log(email)
        res.status(202).json({message:'Mail received'})
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = {
    forgotPassword,
}