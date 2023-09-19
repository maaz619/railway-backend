import express from "express"
import morgan from "morgan"
import userRouter from "./src/routes/user.route"
import trainRouter from "./src/routes/train.route"
import bookingRouter from "./src/routes/booking.route"
import stationRouter from "./src/routes/station.route"
import { ErrorRequestHandler } from "express"



const app = express()

app.use(morgan("dev"))
app.use(express.json())

if (process.argv[2] === '--dev') process.env.NODE_ENV = 'dev'
else process.env.NODE_ENV = 'prod'

app.use('/api/v1/users/', userRouter)
app.use('/api/v1/trains/', trainRouter)
app.use('/api/v1/tickets/', bookingRouter)
app.use('/api/v1/stations/', stationRouter)

app.get('/', (req, res) => {
    res.send("Welcome to IRCTC!!")
})

if (process.env.NODE_ENV === 'dev') {
    // errorHandler for only development environment
    const errorHandlerDev: ErrorRequestHandler = (err, req, res, next) => {
        res.status(err.statusCode).json({
            status: err.status,
            err: err,
            message: err.message,
            stack: err.stack,
        });
    }
    app.use(errorHandlerDev)
}
else {
    // errorHandler for only produnction environment
    const errorHandlerProd: ErrorRequestHandler = (err, req, res, next) => {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
    app.use(errorHandlerProd)
}

export default app