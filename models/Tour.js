import mongoose from "mongoose";

const TourSchema = new mongoose.Schema({
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
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Tour', TourSchema)

