import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findbyIdAndUpdate(hotelId, {
                $push: {rooms: savedRoom._id}
            })
        } catch (error) {
            next(err)
            
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

export const updateRoom = async (req, res, next) => {

    try {
        const room = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        
        res.status(200).json({error: false, message: 'update room successfully', data: room})
    } catch (error) {
        console.log(error)
        next(error)
        // res.status(500).json({error: false, message: 'Error create hotels', error})
        
    }
}
export const updateAvailability = async (req, res, next) => {

    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumebers.$.unavailableDates": req.body.dates
                }
            })
        
        res.status(200).json({error: false, message: 'update room successfully', data: room})
    } catch (error) {
        console.log(error)
        next(error)
        // res.status(500).json({error: false, message: 'Error create hotels', error})
        
    }
}

export const getRoom = async (req, res, next) => {
    // const failed = true
    // if(failed) return next(createError(401, 'Unauthorized') )

    try {
        // const hotels = {hotels: [{id: 1, name: 'hotels a'}]}
        const room = await Room.findById(req.params.id)
        if(!room){
            res.status(200).json({error: false, message: 'Room not found'})
        }
        res.status(200).json({error: false, message: room})
        
    } catch (error) {
        console.log(error)
        next(error)
        // res.status(200).json({error: false, message: 'Error in API hotels',})
    }
}

export const getRooms = async (req, res, next) => {
    //play with middleware
    // console.log("i am on hotels")
    // return next()

    //error handling
    // const error = true
    // const err = new Error()
    // err.status = 404
    // err.message = "Route not found"
    // if(error){
    //     return next(err)
    // }

    try {
        // const hotels = {hotels: [{id: 1, name: 'hotels a'}]}
        const rooms = await Room.find()
        res.status(200).json({error: false, message: 'Successfully get Rooms', data: rooms})
        
    } catch (error) {
        console.log(error)
        next(err)
        // res.status(200).json({error: false, message: 'Error in API hotels',})
    }
}

export const deleteRoom = async (req, res, next) => {
    try {
        await Room.findByIdAndDelete(req.params.id)
        res.status(200).json({error: false, message: 'Room deleted successfully'})
    } catch (error) {
        console.log(error)
        next(error)
        // res.status(500).json({error: false, message: 'Error in delete API', error})
    }
}