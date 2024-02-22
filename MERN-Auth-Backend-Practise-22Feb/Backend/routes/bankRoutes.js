const express = require('express')
const {
    getAllUsers,
    getSingleUser,
    postSingleUser,
    patchSingleUser,
    deleteSingleUser
} = require('../controllers/controlBankRoutes')
const router = express.Router()

// =====================================Routes==============================
// GET all users
router.get('/', getAllUsers)

// GET single users
router.get('/:id', getSingleUser)

// POST a new user
router.post('/', postSingleUser)

// PATCH a user
router.patch('/:id', patchSingleUser)

// DELETE a user
router.delete('/:id', deleteSingleUser)
// =====================================Routes==============================
module.exports = router