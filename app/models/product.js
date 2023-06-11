const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,//Number
        required:[true,"price is required"]
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        immutable:true, 
        ref:"User"
    },
    lastModifiedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product