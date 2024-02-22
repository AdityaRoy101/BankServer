const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bankSchema = new Schema({
    Firstname: {
        type: String,
        required: true
    },
    Lastname: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Pincode: {
        type: Number,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('bankSchema', bankSchema)