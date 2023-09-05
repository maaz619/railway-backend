import express from "express"
import morgan from "morgan"
import userRouter from "./src/routes/user.route"
import trainRouter from "./src/routes/train.route"
import bookingRouter from "./src/routes/booking.route"
import stationRouter from "./src/routes/station.route"
import { Response, Request, NextFunction, ErrorRequestHandler } from "express"

// errorHandler for only development
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.statusCode).json({
        status: err.status,
        err: err,
        message: err.message,
        stack: err.stack,
    });
}

const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.use('/api/v1/users/', userRouter)
app.use('/api/v1/trains/', trainRouter)
app.use('/api/v1/tickets/', bookingRouter)
app.use('/api/v1/stations/', stationRouter)

app.get('/', (req, res) => {
    res.send("Welcome to IRCTC!!")
})


app.use(errorHandler)

export default app