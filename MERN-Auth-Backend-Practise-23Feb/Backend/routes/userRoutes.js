const express = require('express')
const {
    signInUser,
    signUpUser
} = require('../controllers/userController')

const router = express.Router();

// ================================routes=======================================
router.post('/signin', signInUser)
router.post('/signup', signUpUser)
// ================================routes=======================================
module.exports = router