const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator');
const { use } = require('../routes/userRoutes');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type:  String,
        required: true 
    },
    password: {
        type:  String,
        required: true
    }
}, { timestamps: true })


// User signUp schema
userSchema.statics.signup = async function(email, password) {

    // Email and Password validation
    if(!email || !password){
        throw Error("All feilds must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough")
    }

    // ================
    
    const exist = await this.findOne({email})

    if(exist){
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash})

    return user
}


// User signIn schema
userSchema.statics.signin = async function(email, password) {

    // Email and Password validation
    if(!email || !password){
        throw Error("All feilds must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error("No user with such Email exists")
    }
    // ================

    // password matching
    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error("Enter correct Password")
    }

    return user
}
module.exports = mongoose.model('userSchema', userSchema);