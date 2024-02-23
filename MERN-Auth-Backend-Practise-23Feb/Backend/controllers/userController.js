const userSchema = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_TOKEN, { expiresIn: '3d' })
}

const signInUser = async(req, res) => {
    
    const {email, password} = req.body

    try {
        const user = await userSchema.signin(email, password)

        // creating a JWT token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// user signup
const signUpUser = async(req, res) => {

    const {email, password} = req.body

    try {
        const user = await userSchema.signup(email, password)

        // creating a JWT token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    signInUser,
    signUpUser
}