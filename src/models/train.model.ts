import { Schema, model } from "mongoose"

const trainSchema = new Schema({
    name: {
        type: String,
        required: [true, "name field is require"],
    },
    origin_depatrure_time: {
        type: Date,
        required: true,
        default: Date.now()
    },
    destination_arrival_time: {
        type: Date,
        required: true,
        default: Date.now()
    },
    origin: {
        type: String,
        required: [true, "origin field is require"],
    },
    destination: {
        type: String,
        required: [true, "destination field is require"],
    },
    train_number: {
        type: Number,
        validate: {
            validator: function (val: number) {
                return val.toString().length === 5;
            },
            message: (val: any) => `${val.value} must be equal to 5 digit`
        },
        required: [true, "train number field is require"],
    },
    total_time: {
        type: Number,
        required: [true, "total journey time field is require"]
    },
    total_distance: {
        type: Number,
        required: [true, "total journey distance field is require"]
    },
    total_station: {
        type: Number,
        required: [true, "total station field is require"]
    },
    stations: [{
        type: Schema.Types.ObjectId,
        ref: "stop"
    }]
})

const Train = model("train", trainSchema)

export default Train