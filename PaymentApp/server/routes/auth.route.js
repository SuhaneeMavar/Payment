const express = require('express')
const router = express.Router()
const { getUserByEmail, getUserById } = require('../controllers/user.controller')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const { authenticate } = require('../middlewares/auth')

//login
router.post('/login', async (req, res) => {
    try {
        const user = await getUserByEmail(req.body.email)
        if (user == null)
            return res.status(400).send('Email or Password is incorrect')

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword)
            return res.status(400).send('Email or Password is incorrect')

        const token = jwt.sign({ _id: user._id }, config.TOKEN_SECRET)
        console.log(token);

        res.status(200).send({'token':token})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error in login')
    }
})

//get authenticated user
router.get('/authenticate', authenticate, async (req, res) => {
    const verify=jwt.verify(req.headers.authentication,config.TOKEN_SECRET)
    const userId = verify._id
    try {
        const user = await getUserById(userId)
        return res.status(200).send(user)
    } catch (error) {
        console.log(error);
        return res.status(401).send('Not authenticated')
    }
})



module.exports = router