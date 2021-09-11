const jwt = require('jsonwebtoken')
const config=require('../config/config')
module.exports.authenticate = async (req, res, next) => {
    const token = req.headers.authentication
    if(!token)
        return res.status(401).send('Access Denied')
    
    try {
        const verify=jwt.verify(token,config.TOKEN_SECRET)
        req.authenticatedUser=verify
    } catch (error) {
        console.log(error);
        return res.status(500).send('Not Authenticated')
    }
    next()
}