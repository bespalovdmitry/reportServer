import express from 'express'
import mongoose from "mongoose";
import {registerValidation} from './validations/auth.js'
import checkAuth from "./utils/checkAuth.js";


import * as TourController from "./controllers/TourController.js"
import * as UserController from "./controllers/UserController.js"
import {tourValidation} from "./validations/tourValidation.js";

mongoose.connect('mongodb+srv://admin:Lvbnhbq89!@cluster0.xuh8jar.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB Connect'))
    .catch((err) => console.error('DB Error', err))

const app = express()
app.use(express.json())
app.post('/auth/login', UserController.register)
app.post('/auth/register', registerValidation, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/tour', TourController.getAllTours)
app.get('/tour/:id', TourController.getTour)
app.delete('/tour/:id', checkAuth, TourController.removeTour)
// app.patch('/tour/:id', TourController.updateTour)
app.post('/tour', checkAuth, tourValidation, TourController.createTour)


app.listen(4444, (err) => {
    if (err) {
        console.error('Error')
    }
    console.log('Server ok!')
})