import express from 'express'
import { register } from '../controller/auth.js'
import { deleteUser, getUsers } from '../controller/user.js'
import { verifyAdmin, verifyToken, verifyUser } from '../util/verifyToken.js'

const router = express.Router()

router.get('/', verifyAdmin, getUsers)

router.delete('/:id', verifyAdmin, deleteUser)

router.get('/checkauthentication', verifyToken, (req, res, next) => {
    res.send('hello user, you are logged in')
})

router.get('/checkuser/:id', verifyUser, (req, res, next) =>{
    res.send('hello user, you are logged in and you can delete your current account')
})

router.get('/checkadmin', verifyAdmin, (req, res, next) => {
    res.send('hello admin, you are logged in and you can delete all acccouts')
})

router.post('/register', register)

export default router