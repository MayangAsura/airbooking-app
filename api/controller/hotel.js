import Hotel from "../models/Hotel.js"
import {createError} from "../util/error.js"
import Room from "../models/Room.js"

export const createHotel = async (req, res, next) => {

    const new_hotels = new Hotel(req.body)
    try {
        const hotels = await new_hotels.save()
        
        res.status(200).json({error: false, message: 'create hotel successfully', data: hotels})
    } catch (error) {
        console.log(error)
        next(error)
        // res.status(500).json({error: false, message: 'Error create hotels', error})
    }

}

export const getHotel = async (req, res, next) => {
    // const failed = true
    // if(failed) return next(createError(401, 'Unauthorized') )

    try {
        // const hotels = {hotels: [{id: 1, name: 'hotels a'}]}
        const hotel = await Hotel.findById(req.params.id)
        if(!hotel){
            res.status(400).json({error: false, message: 'Hotel not found'})
        }
        res.status(200).json({error: false, message: 'Successfully get hotel', hotel})
        
    } catch (error) {
        console.log(error)
        next(error)
        // res.status(200).json({error: false, message: 'Error in API hotels',})
    }
}

export const getHotels = async (req, res, next) => {
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
        const {min, max, limit, ...properties} = req.query
        console.log(min, max, properties)
        // const hotels = {hotels: [{id: 1, name: 'hotels a'}]}
        const hotels = await Hotel.find({
            ...properties,
            // cheaPestPrice: {$gt: min || 1, $lt: max || 999999999}
        }).limit(limit)
        console.log(hotels)
        res.status(200).json({error: false, message: 'Successfully get hotels', data: hotels})
        
    } catch (error) {
        console.log(error)
        next(err)
        // res.status(200).json({error: false, message: 'Error in API hotels',})
    }
}

export const updateHotel = async (req, res, next) => {

    try {
        const hotels = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        
        res.status(200).json({error: false, message: 'update hotel successfully', data: hotels})
    } catch (error) {
        console.log(error)
        next(error)
        // res.status(500).json({error: false, message: 'Error create hotels', error})
        
    }
}

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.where({ city: city }).countDocuments();
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// export const countByCity = async (req, res, next) => {
//     const cities = req.query.cities.split(",")
//     console.log('cities', cities)
//     try{
//         const list = await Promise.all(cities.map(city => {
//             return Hotel.countDocuments({city:city})
//         }))
//         res.status(200).json(list)
//     }catch (err){
//         next(err)
//     }
// }
export const countByType = async (req, res, next) => {
    
    // const countQuery = await Hotel.where({  type: 'hotel' }).countDocuments();
    try{
        // const cities = req.query.cities.split(",");

        const hotelCount = await Hotel.countDocuments({type: "hotel"})
        // console.log('hotelCount', hotelCount)
        const apartementCount = await Hotel.countDocuments({type: "apartement"})
        const resortCount = await Hotel.countDocuments({type: "resort"})
        const villaCount = await Hotel.countDocuments({type: "villa"})
        const cabinCount = await Hotel.countDocuments({type: "cabin"})
        // const list = await Promise.all(cities.map(city => {
        //     return Hotel.countDocument({city:city}).length
        // }))
        res.status(200).json([
            {type: "hotel", count: hotelCount },
            {type: "apartment", count: apartementCount},
            {type: "resort", count: resortCount},
            {type: "villa", count: villaCount},
            {type: "cabin", count: cabinCount}
        ])
    }catch (err){
        next(err)
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.param.id)
        const list = await Promise.all(hotel.rooms.map(room =>{
            return Room.findById(room)
        }))

        res.status(200).json(list)
    } catch (error) {
        
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json({error: false, message: 'Hotel deleted successfully'})
    } catch (error) {
        console.log(error)
        next(error)
        // res.status(500).json({error: false, message: 'Error in delete API', error})
    }
}