import { NextFunction } from "express";
import { Schema, model, Document } from "mongoose";

export interface ITicket<T> extends Document {
    passanger: T;
    berth: string;
    pnr: number;
    train: T;
    from_station: string;
    to_station: string;
    fare: number;
    transaction_id: string;
    status: string;
    booking_time: Date
}

const ticketSchema = new Schema<ITicket<typeof String>>({
    passanger: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    berth: {
        type: String,
        required: true
    },
    pnr: {
        type: Number,
        validate: {
            validator: function (val: number) {
                return val.toString().length === 10;
            },
            message: (val: any) => ` pnr ${val.value} must be equal to 10 digit`
        }
    },
    train: {
        type: Schema.Types.ObjectId,
        ref: 'train',
        required: true
    },
    from_station: {
        type: String,
        required: [true, "origin station is required"],
    },
    to_station: {
        type: String,
        required: [true, "destination station is required"],
    },
    fare: {
        type: Number,
        required: true
    },
    transaction_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "reserved"
    },
    booking_time: {
        type: Date,
        default: Date.now()
    }

})

ticketSchema.pre<ITicket<string>>("save", async function (next: NextFunction) {
    let min = 1000000000;
    let max = 9999999999;
    this.pnr = Math.floor(Math.random() * (max - min + 1)) + min;
    next()
})

const Ticket = model("ticket", ticketSchema)

export default Ticket