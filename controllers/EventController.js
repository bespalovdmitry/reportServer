import EventModel from '../models/Events.js'

export const createEvent = async (req, res) => {
    try {
        const doc = new EventModel({
            title: req.body.title,
            start: req.body.start,
            color: req.body.color,
            user: req.userId,
            dateTour: req.body.dateTour,
            service: req.body.service,
            pickUpTime: req.body.pickUpTime,
            hotel: req.body.hotel,
            guide: req.body.guide,
            agent: req.body.agent,
            tourDescription: req.body.tourDescription,
        })
        const event = await doc.save()
        res.json(event)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Event no create"
        })
    }
}
export const getAllEvent = async (req, res) => {
    try {
        const events = await EventModel.find()
        res.json(events)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Event dont download"
        })
    }
}
