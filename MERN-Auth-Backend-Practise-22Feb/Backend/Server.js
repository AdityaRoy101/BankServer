const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose')
const bankRoutes = require('./routes/bankRoutes')

const app = express();

// ==================================Middlewares==================================
app.use(express.json())
// ==================================Middlewares==================================
// ==================================Routes=======================================
app.get('/', (req,res) => {
    res.status(200).json({
        message: "Server is working Fine"
    })
})

app.use('/api/bank', bankRoutes)
// ==================================Routes=======================================
// ================Connecting to DB========================
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen((process.env.PORT), () => {
            console.log(`Connected To Mongo DB & Server is listening to ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })