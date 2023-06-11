const authorize = (req, res, next) =>{
    if(req.permittedRoles.includes(req.user.role)){
        next()
    }else{
        res.status(403).json("you are not authorized to acceess this route ")
    }
}

module.exports = authorize