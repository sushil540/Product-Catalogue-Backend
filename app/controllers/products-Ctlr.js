const Product = require('../models/product')
const productCtlr = {}

productCtlr.list = async(req, res) =>{
    try{
        const products = await Product.find()
        res.json(products)
    }catch(e){
        res.json(e)
    }   
}

productCtlr.create = async(req, res) =>{
    try{
        const body = req.body
        body.lastModifiedBy = req.user.id
        body.createdBy = req.user.id
        const product = await Product.create(body)
        res.json(product)
    }catch(e){
        res.json(e)
    }
}

productCtlr.update = async(req, res) =>{
    try{
        const id = req.params.id
        const body = req.body
        body.lastModifiedBy = req.user.id
        const product = await Product.findByIdAndUpdate(id, body, {new:true, runValidators:true})
        if(product){
            res.json(product)
        }else{
            res.json({})
        }
    }catch(e){
        res.json(e)
    }
}

productCtlr.show = async(req, res) =>{
    try{
        const id = req.params.id
        const product = await Product.findById(id)
        res.json(product)
    }catch(e){  
        res.json(e)
    }
}

productCtlr.destroy = async(req, res) =>{
    try{
        const id = req.params.id
        const product = await Product.findByIdAndDelete(id)
        if(product){
            res.json(product)
        }else{
            res.json({})
        }
    }catch(e){
        res.json(e)
    }
}

module.exports = productCtlr