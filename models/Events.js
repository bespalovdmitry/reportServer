import mongoose from "mongoose";

const CalendarSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        start: {
            type: Date,
            required: true,
        },
        color: {
            type: String,
            required: false
        },
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // },
        dateTour: {
            type: Date,
            required: true
        },
        service: {
            type: String,
            required: true,
        },
        pickUpTime: Date,
        tourDescription: {
            type: String,
            required: true
        },
        hotel: String,
        guide: String,
        agent: String,
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Event', CalendarSchema)

