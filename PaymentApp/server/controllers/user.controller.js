const User = require('../models/user')
const bcrypt = require('bcryptjs')
const Joi = require('@hapi/joi')

//Validation Schema
const userSchema = {
    userName: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(30).required().email(),
    bio: Joi.string().required(),
    password: Joi.string().min(0).max(8).required()
}

//methods
module.exports.addUser = async (userObj) => {

    var user = new User({
        userName: userObj.userName,
        role:userObj.role,
        email: userObj.email,
        password: userObj.password,
    })

    const salt = bcrypt.genSaltSync(10)
    try {
        // const result = await Joi.validate(userObj, userSchema, { abortEarly: false })
        user.password = await bcrypt.hash(user.password, salt)
    } catch (error) {
        console.log(error);
        throw error
    }

    return await User.create(user)
}

module.exports.getUserById = async (id) => {
    return await User.findOne({ _id: id })
}

module.exports.getUserByEmail = async (email) => {
    return await User.findOne({ email: email })
}
