const mongoose = require('mongoose')

const configDB = async() =>{
   try{
       const uri = "mongodb+srv://gpsushil64:sushil%40atlas@cluster0.qcakilt.mongodb.net/product-catalogue?retryWrites=true&w=majority"
      //  const DB = await mongoose.connect('mongodb://127.0.0.1:27017/product-catalog')
      const DB = await mongoose.connect(uri)
       console.log("connected to db")
    }catch(e){
       console.log("error connecting to db")
    }
}

module.exports = configDB