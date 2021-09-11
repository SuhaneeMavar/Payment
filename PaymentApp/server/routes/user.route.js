const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user.controller')

//register user
router.post('/', async (req, res) => {
    try {
        const emailExists = await userCtrl.getUserByEmail(req.body.email)
        if (emailExists)
            res.status(400).send('Email already exists')
        const userObj = await userCtrl.addUser(req.body)
        res.status(201).json(userObj)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in creating user')
    }

})

//GetUserBYEmail
router.get('/search', async (req, res) => {
    try {
        const userObj = await userCtrl.getUserByEmail(req.query.email)
        res.status(200).json(userObj)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in getting user by email')
    }
})

//getUserById
router.get('/:id', async (req, res) => {
    try {
        const userObj = await userCtrl.getUserById(req.params.id)
        res.status(201).json(userObj)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in getting user by id')
    }
})


module.exports = router