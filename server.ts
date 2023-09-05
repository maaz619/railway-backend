import mongoose from "mongoose"
import app from "./app";
import dotenv from "dotenv"
import http from "node:http"


dotenv.config()

const server = http.createServer(app)
const PORT = process.env.PORT || 8000

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {}),
            console.log("DB connected")
    } catch (error) {
        console.log(error)
    }
}

server.listen(PORT, () => {
    dbConnect()
    console.log(`server started at ${PORT}`)
})