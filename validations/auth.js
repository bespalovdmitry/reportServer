import { body } from "express-validator";

export const registerValidation = [
    body('email', 'Incorrect Email').isEmail(),
    body('password', 'Easy password').isLength({min: 5}),
    body('fullName', 'Min length 3').isLength({min: 3}),
    body('avatarURL','No URL').optional().isURL(),
]

export const loginValidation = [
    body('email', 'Incorrect Email').isEmail(),
    body('password', 'Easy password').isLength({min: 5}),
]