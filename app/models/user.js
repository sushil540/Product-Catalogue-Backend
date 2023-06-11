const mongoose = require('mongoose')
const emailFormat = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,   
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return emailFormat.test(value)
            },
            message:function(){
                return "Incorrect email"
            }
        }
    },  
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','customer','moderator'],
        default:'customer',
    }
})

userSchema.pre('save', async function(){
    try{
        const count = await this.collection.countDocuments({})
        if(count === 0) {
            this.role = "admin"
        }
    }catch(e){
        console.log(e)
    }
})  

const User = mongoose.model("User", userSchema)

module.exports = User
