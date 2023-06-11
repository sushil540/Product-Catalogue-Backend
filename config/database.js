const mongoose = require('mongoose')

const configDB = async() =>{
    try{
       const DB = await mongoose.connect('mongodb://127.0.0.1:27017/product-catalog')
       console.log("connected to db")
    }catch(e){
       console.log("error connecting to db")
    }
}

module.exports = configDB