const User = require('../models/user')
const bcryptjs = require('bcryptjs') 
const jwt = require('jsonwebtoken')
require('dotenv').config()
const usersCtlr = {}

usersCtlr.register = async(req, res) =>{
    try{
        const body = req.body
        delete body.role 
        const userObj = new User(body)
        const salt = await bcryptjs.genSalt()
        const hashPass = await bcryptjs.hash(userObj.password, salt)
        userObj.password = hashPass
        const user = await userObj.save()
        res.json(user)
    }catch(e){  
        res.json(e)
    }
}

usersCtlr.login = async (req, res) =>{
    try{
        const body = req.body
        const user = await User.findOne({email:body.email})
        if(user){
            const result = await bcryptjs.compare(body.password, user.password)
            if(result){
                const tokenData = {
                    id:user._id,
                    name:user.username,
                    role:user.role
                }
                const token = jwt.sign(tokenData, process.env.JWT_TOKEN)
                res.json({
                    token:`Bearer ${token}`
                })
            }else{
                res.json({
                    error:"Invalid email / password"
                })
            }
        }else{
            res.json({
                error:"Invalid email / password"
            }) 
        }
    }catch(e){
        res.json(e)
    }
}   

usersCtlr.list = async(req, res) =>{
    try{
        const users = await User.find()
        res.json(users)
    }catch(e){
        res.json(e)
    }
}

usersCtlr.show = async(req, res) =>{
    try{
        const id = req.params.id
        const user = await User.findById(id)
        if(user){
            res.json(user)
        }else{
            res.json({})
        }
    }catch(e){
        res.json(e)
    }
}

usersCtlr.account = (req, res)=>{
    res.json(req.user)
}

usersCtlr.changeModerator = async(req, res) =>{
    try{
        const { id , text} = req.query
        const user = await User.findByIdAndUpdate(id, {role:text}, {new:true, runValidators:true})
        if(user){
            res.json(user)
        }else{
            res.json({})
        }
    }catch(e){
        res.json(e)
    }
}

module.exports = usersCtlr