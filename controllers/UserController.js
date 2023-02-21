import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            avatarURL: req.body.avatarURL,
            passwordHash: hash
        })

        const user = await doc.save()
        const {passwordHash, ...userData} = user._doc
        const token = jwt.sign({
            _id: user._id
        }, 'secret123', {expiresIn: '30d'})
        res.json({userData, token})
    } catch (e) {
        console.error(e)
        res.status(500).json({
            message: 'No registered'
        })
    }
}
export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})
        if (!user) {
            return res.status(404).json({
                message: 'No have this email'
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if (!isValidPass) {
            return res.status(404).json({
                message: 'No correct login or password'
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, 'secret123', {expiresIn: '30d'})
        const {passwordHash, ...userData} = user._doc
        res.json({userData, token})

    } catch (e) {
        console.error(e)
        res.status(500).json({
            message: 'No login'
        })
    }
}
export const getMe = async (req, res) => {
    try {
        console.log(req.userId)
        const user = await UserModel.findById(req.userId)
        if (!user) {
            return res.status(404).json({
                message: 'NO USER'
            })
        }
        const {passwordHash, ...userData} = user._doc
        res.send(userData)
    } catch (e) {
        console.error(e)
        return res.status(555).json({
            message: 'No access'
        })
    }
}