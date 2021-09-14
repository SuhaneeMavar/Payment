const express = require('express')
const paymentCtrl = require('../controllers/payment.controller')
const router = express.Router()
const Payment= require('../models/payment')

//creating a payment
router.post('/', async (req, res) => {
    try {
        const paymentObj = new Payment({
            user: req.body.user,
            amount: req.body.amount,
            status: req.body.status,
            method: req.body.method,
        })
        const response = await paymentCtrl.createPayment(paymentObj)
        res.json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": 'Error in creating payment' })
    }

})

//getting all payments
router.get('/', async (req, res) => {
    try {
        const response = await paymentCtrl.getAllPayments()
        res.json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": 'Error in getting payment' })
    }

})

//getPayment by user
router.get('/search', async (req, res) => {
    try {
        const response = await paymentCtrl.getPayementsByUser(req.query.userId)
        res.json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": 'Error in creating payment' })
    }

})

//creating payment intent
router.post('/create-payment-intent', async (req, res) => {
    try {
        const response = await paymentCtrl.pay(req.body)
        res.json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": 'Error in payment' })
    }

})


module.exports = router