const { default: mongoose } = require('mongoose')
const bankSchema = require('../models/bankSchema')

// GET All Users
const getAllUsers = async(req,res) => {
    
    const allUsers = await bankSchema.find({}).sort({createdAt: -1})

    if(!allUsers){
        return res.status(404).json({
            error: "No users found"
        })
    }

    res.status(200).json(allUsers)
}

// GET Single User
const getSingleUser = async(req,res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            Error: "Not a valid id"
        })
    }

    const bankUser = await bankSchema.findById(id);

    if(!bankUser){
        return res.status(400).json({
            Error: "Such user doesn't Exists"
        })
    }

    res.status(200).json(bankUser)
}

// POST Single User
const postSingleUser = async(req,res) => {

    const { Firstname, Lastname, Address, Pincode, Amount } = req.body

    if(!Firstname || !Lastname || !Address || !Pincode || !Amount){
        return res.status(400).json({
            error: 'Please provide complete information'
        })
    }

    const duplicate = await bankSchema.find({Firstname: Firstname})
    if(duplicate.length != 0){
        return res.status(400).json({
            error: "Users Existed try different name"
        })
    }

    const userDetails = await bankSchema.create({ Firstname, Lastname, Address, Pincode, Amount })
    
    res.status(201).json(userDetails);
}

// PATCH Single User
const patchSingleUser = async(req,res) => {

    const { id } = req.params
    // const { Firstname, Lastname, Address, Pincode, Amount } = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            Error: "Not a valid id"
        })
    }

    const bankUser = await bankSchema.findByIdAndUpdate({_id: id}, {
        ...req.body
    });

    if(!bankUser){
        return res.status(400).json({
            Error: "Such user doesn't Exists"
        })
    }

    res.status(200).json(bankUser)
}

// DELETE Single User
const deleteSingleUser = async(req,res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            Error: "Not a valid id"
        })
    }

    const bankUser = await bankSchema.findByIdAndDelete(id);

    if(!bankUser){
        return res.status(400).json({
            Error: "Such user doesn't Exists"
        })
    }

    res.status(200).json(bankUser)
}

module.exports = {
    getAllUsers,
    getSingleUser,
    postSingleUser,
    patchSingleUser,
    deleteSingleUser
}