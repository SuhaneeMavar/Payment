const mongoose = require('mongoose')
const Payment = require('../models/payment')
//requiring stripe
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

module.exports.pay = async (data) => {
    try {

        //payment-intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: data.amount * 100,
            currency: "inr",
            receipt_email: data.user.email
        });

        //returning client-secret
        return { 'clientSecret': paymentIntent.client_secret }

    } catch (error) {
        throw error
    }
}

module.exports.getAllPayments = async () => {
    return await Payment.find().populate('user')
}

module.exports.getPayementsByUser=async (userId)=>{
    return await Payment.find({'user':mongoose.Types.ObjectId(userId)})
}

module.exports.createPayment= async (data)=>{
    return await Payment.create(data)
}