import { Document, Schema, model } from "mongoose";

export interface IStation extends Document {
    name: string;
    short_name: string;
    state: string;
    trains: string[];
    division: string
}

const stationSchema = new Schema<IStation>({
    name: {
        type: String,
        required: [true, "station is a required field"],
        unique: true
    },
    short_name: {
        type: String,
        required: [true, "station short name is a required field"],
        unique: true
    },
    state: {
        type: String,
        required: [true, "station state is a required field"]
    },
    trains: [{
        type: Schema.Types.ObjectId,
        ref: "stop"
    }],
    division: {
        type: String,
        required: [true, "station division is a required field"]
    }
})

const Station = model('station', stationSchema);

export default Station