const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) =>{
    const token = req.header('Authorization').split(' ')[1]
    console.log("token",token)
    if(token){
        try{
            const tokenData = jwt.verify(token, process.env.JWT_TOKEN)
            req.user = {
                id:tokenData.id,
                role:tokenData.role
            }
            next()
        }catch(e){
            res.status(401).json(e)
        }
    }else{
        res.status(401).json("token not present")
    }   
}

module.exports = authenticateUser