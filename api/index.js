import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoute from './routes/auth.js'
import hotelRoute from './routes/hotels.js'
import roomRoute from './routes/rooms.js'
import userRoute from './routes/users.js'

const app = express()

dotenv.config()
 
const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connect to mongodb')
    
    } catch (error) {
        console.log(error)
    }
}

connect()

mongoose.connection.on('disconnected', () =>{
    console.log('MongoDB is disconnected')
})
mongoose.connection.on('connected', () =>{
    console.log('MongoDB is connected')
})

//middleware
// app.use((req, res, next) => {
//     // res.send('I am on middleware')
// })

app.get('/',  (req, res) => {
    console.log('Hello there')
    res.send('Hello from bookingapp')
})


app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/hotels', hotelRoute)
app.use('/api/rooms', roomRoute)


//error handling
app.use((err, req, res, next) => {
    const errStatus = err.status || 500
    const errMessage = err.message || "Something error"

    return res.status(500).json({error: errStatus, message: errMessage, errorStack : err.stack})
})



app.listen(8080, () => {
    console.log(`Server running on port 8080`)
})