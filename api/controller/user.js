import User from "../models/User.js"

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        if(!users){
            return res.status(400).json({error: true, message: 'Users data not available'})
        }
        res.status(200).json({error: false, message: 'Successfully get Users', data: users})

    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        console.log('req.param.id', req.params.id)
        await User.deleteOne({_id: req.params.id})
        
        res.status(200).json({error: false, message: 'Successfully deleted one user'})
    } catch (error) {
        next(error)
    }
}