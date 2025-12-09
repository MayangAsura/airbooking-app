import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createError } from '../util/error.js'
export const register = async (req, res, next) => {

    try {
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({
            ...req.body,
            password: hashPassword
        })
        await newUser.save()
        res.status(200).send("User has been created")
    } catch (error) {
        next(error)
    }
}
export const login = async (req, res, next) => {

    try {
        const user = await User.findOne({username: req.body.username})
        if(!user){
            next(createError(404, 'User not found'))
        }
        const matchPassword = await bcrypt.compare(req.body.password, user.password)
        if(!matchPassword){
            next(createError(400, 'Wrong Password or Username'))
        }

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)
        const { password, isAdmin, ...otherProperties} = user._doc
        res.cookie("access_token", token, {
            httpOnly: true
        })
        .status(200)
        .json({details: {...otherProperties}, isAdmin})
        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}
