import express from 'express'
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel, getHotelRooms, countByType, countByCity } from '../controller/hotel.js'

const router = express.Router()

router.post('/create', createHotel)
router.get('/', getHotels)
router.get('/countBytype', countByType)
router.get('/countByCity', countByCity)
router.patch('/update/:id', updateHotel)

router.get('/:id', getHotel)
router.get('/rooms/:id', getHotelRooms)

router.delete('/delete/:id', deleteHotel)
// router.post('/', (req, res) => {
//     res.json({error : false, message: 'Create'})
// })

export default router

