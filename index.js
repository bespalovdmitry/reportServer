import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import {loginValidation, registerValidation} from './validations/auth.js'
import {UserController, TourController, EventController} from "./controllers/index.js"
import {tourAddValidation} from "./validations/tourAddValidation.js";
import {handleValidationErrors, checkAuth} from "./utils/index.js"

mongoose.connect('mongodb+srv://admin:Lvbnhbq89!@cluster0.xuh8jar.mongodb.net/event?retryWrites=true&w=majority')
    .then(() => console.log('DB Connect'))
    .catch((err) => console.error('DB Error', err))


const app = express()
app.use(express.json())

app.use(cors())
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/tour', TourController.getAllTours)
app.get('/tour/:id', TourController.getTour)
app.delete('/tour/:id', checkAuth, TourController.removeTour)
app.patch('/tour/:id', checkAuth, TourController.updateTour)
app.post('/tour', checkAuth, tourAddValidation, handleValidationErrors, TourController.createTour)


app.post('/event',handleValidationErrors, EventController.createEvent)
app.get('/events', EventController.getAllEvent)


app.listen(4444, (err) => {
    if (err) {
        console.error('Error')
    }
    console.log('Server ok!')
})