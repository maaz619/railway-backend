import { Schema, model } from "mongoose";
const stopsSchema = new Schema({
    train: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'train'
    },
    station: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'station'
    },
    arrival: {
        type: String,
        required: true,
    },
    departure: {
        type: String,
        required: true,
    },
    position: {
        type: Number,

    }
})

const Stop = model('stop', stopsSchema);

export default Stop