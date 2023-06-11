const express = require('express')
const router = express.Router()
const usersCtlr = require('../app/controllers/users-Ctlr')
const productCtlr = require('../app/controllers/products-Ctlr')
const authenticateUser = require('../app/middlewares/authenticate')
const authorize = require('../app/middlewares/authorize')

router.post('/api/users/register', usersCtlr.register)
router.post('/api/users/login', usersCtlr.login)
router.get('/api/users',authenticateUser, (req, res, next)=>{
    req.permittedRoles = ['admin']
    next()
}, authorize, usersCtlr.list)

router.get('/api/users/account', authenticateUser, (req, res, next)=>{
    req.permittedRoles = ['admin','customer','moderator']
    next()
}, authorize, usersCtlr.account)

router.put('/api/users',authenticateUser, (req, res, next)=>{
    req.permittedRoles = ['admin']
    next()
}, authorize ,usersCtlr.changeModerator)

router.get('/api/users/:id', authenticateUser, (req, res, next) =>{
    req.permittedRoles = ['admin']
    next()
}, authorize, usersCtlr.show)


router.get('/api/products',authenticateUser, (req, res, next)=>{
    req.permittedRoles = ['admin','moderator','customer']
    next()
}, authorize, productCtlr.list)

router.post('/api/products', authenticateUser, (req, res, next)=>{
    req.permittedRoles = ['admin','moderator']
    next()
},authorize, productCtlr.create)

router.put('/api/products/:id', authenticateUser, (req, res, next) =>{
    req.permittedRoles = ['admin','moderator']
    next()
}, authorize, productCtlr.update)

router.get('/api/products/:id',authenticateUser, (req, res, next)=>{
    req.permittedRoles = ['admin','moderator','customer']
    next()
},authorize ,productCtlr.show)

router.delete('/api/products/:id', authenticateUser, (req, res, next)=>{
    req.permittedRoles = ['admin']
    next()
}, authorize, productCtlr.destroy)

module.exports = router