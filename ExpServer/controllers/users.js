const User = require('../models/users')

const addUsers = async(req,res,next) => {
    function stringValidate(string){
        if(string === undefined || string.length === 0){
            return true;
        }
        else{
            return false;
        }
    }
    try{
        console.log(req.body)
        const name = req.body.Name
        const email = req.body.Email
        const password = req.body.Password 
        if(stringValidate(name) || stringValidate(email) || stringValidate(password)){
            return res.status(400).json({err: 'Bad Parameters'})
        }
        await User.create({name:name, email:email, password:password})
        res.status(201).json({message: 'User created successfully'})
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

const loginUsers = async(req,res,next) => {
    try{
        let flag = true;
        const email = req.body.Email
        const password = req.body.Password
        const allUsers = await User.findAll();
        const allUsersData = JSON.parse(JSON.stringify(allUsers))
        for(let i=0; i<allUsersData.length; i++)
        {
            if(allUsersData[i].email === email && allUsersData[i].password === password){
                res.status(200).json({message: 'Login Successful!!'})
                flag = false;
                break;
            }
        }
        if(flag)
        {
            res.status(404).json({message: "User doesn't exists"})
        }

    }
    catch(err){
        console.log(err)
        res.status(401).json({
            error: 'Invalid Credentials'
        })
    }
}

module.exports = {
    addUsers,
    loginUsers
}