import express from 'express'
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateAvailability } from '../controller/room.js'
import { verifyAdmin } from '../util/verifyToken.js'

const router = express.Router()

router.get('/', getRooms)
router.get('/:id', getRoom)
router.get('/availability/:id', updateAvailability)
router.post('/hotels/:hid/rooms', verifyAdmin, createRoom)
router.put('/:id', verifyAdmin, updateRoom)
router.delete('/:id', verifyAdmin, deleteRoom)

export default router